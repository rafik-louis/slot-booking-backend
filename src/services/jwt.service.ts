import * as jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';

/**
 * A service that handles signing and verifying JWT tokens
 */
export class JWTService {
	public sign(payload: Object, options: Object) {
		return jwt.sign(payload, jwtConfig.JWTSecret, options);
	}

	public verify(token: string) {
		return jwt.verify(token, jwtConfig.JWTSecret);
	}
}
