import { Request, Response } from "express";
const _ = require("lodash");
import tokenConfig from "../../config/token.config";
import { HashingService } from "../../services/hashing.service";
import { JWTService } from "../../services/jwt.service";
import InvalidCredentialsException from "../../util/exceptions/invalidCredentials.exeption";
import * as _request from "request";
import RefreshTokenExpiredException from "src/util/exceptions/refreshTokenExpired.exception";
import { Controller } from "../controller";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";

export class UserController extends Controller<User> {
	
	private userRepository: UserRepository;
	private hashingService: HashingService;
	private jwtService: JWTService;

	public constructor() {
		super();
		this.userRepository = new UserRepository();
		this.setRepository(this.userRepository);
		this.hashingService = new HashingService();
		this.jwtService = new JWTService();
	}

	public async login(request: Request, response: Response) {
		try {
			request.body.email = request.body.email.toLowerCase();
			const { email, password } = request.body;

			const user: User = await this.userRepository.findOne({
				where: { email },
			});

			if (!user) {
				throw new InvalidCredentialsException();
			}

			const isPasswordCorrect = await this.hashingService.matchPassword(
				password,
				user.password
			);

			if (!isPasswordCorrect) {
				throw new InvalidCredentialsException();
			}

			delete user.password;

			const token = await this.jwtService.sign(
				{ id: user.id },
				{ expiresIn: tokenConfig.UserLoginTokenExpiryMins + "m" }
			);

			const refreshToken = await this.jwtService.sign(
				{ id: user.id },
				{ expiresIn: tokenConfig.UserRefreshTokenExpiryDays + "d" }
			);

			return response
				.set({
					Authorization: `Bearer ${token}`,
				})
				.send({ user, token: `Bearer ${token}`, refreshToken });
		} catch (error) {
			response.status(error.statusCode || 500).send(error.message || "");
		}
	}

	public async refreshToken(request: Request, response: Response) {
		try {
			try {
				this.jwtService.verify(request.body.refreshToken);
			}
			catch (error) {
				throw new RefreshTokenExpiredException();
			}
			const user: User = await this.userRepository.findOne({
				where: { id: request.body.id },
				relations: ["roles", "studentProfile", "facultyProfile"],
			});

			if (!user) throw new Error("Critical error, please log in agian!");

			delete user.password;

			const token = await this.jwtService.sign(
				{ id: user.id },
				{ expiresIn: tokenConfig.UserLoginTokenExpiryMins + "m" }
			);

			const refreshToken = await this.jwtService.sign(
				{ id: user.id },
				{ expiresIn: tokenConfig.UserRefreshTokenExpiryDays + "d" }
			);


			return response
				.set({
					Authorization: `Bearer ${token}`,
				})
				.send({ user, token: `Bearer ${token}`, refreshToken });
		} catch (error) {
			response.status(error.statusCode || 500).send(error.message || "");
		}
	}

}
