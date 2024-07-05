import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm';

@Entity()
@Check('lower("username") = "username"')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique:true })
	username: string;

	@Column({ nullable: false })
	password: string;

	@Column({ default: false })
	archived: boolean;
}
