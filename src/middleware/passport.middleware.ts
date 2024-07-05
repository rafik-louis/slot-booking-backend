import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import {UserRepository} from '../core/users/user.repository';
import {User} from '../core/users/user.model';

export const passportJWt = (passport) => {
	const userRepository: UserRepository = new UserRepository();
	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: jwtConfig.JWTSecret,
			},
			async ({id}, done) => {
				const user: User = await userRepository.findOne({id});
				if (!user) done(null, false);
				else done(null, user);
			}
		)
	);
};

