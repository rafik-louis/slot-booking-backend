import {TypeORMRepository} from '../../database/TypeORMRepository';
import {UserEntity} from '../../database/entity/user.entity';
import {User} from './user.model';

export class UserRepository extends TypeORMRepository<User, UserEntity> {
	public constructor() {
		super(UserEntity);
	}

	protected toModel(entity: UserEntity): User {
		return new User(entity);
	}

	protected getCriteria(model: User): object {
		return {id: model.id};
	}

	public getQueryBuilder() {
		return this.context.createQueryBuilder('user');
	}
}
