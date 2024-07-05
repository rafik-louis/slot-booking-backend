
export interface IUser {
	id?: number;
	username: string;
	password: string;
	archived?: boolean;
}

export class User {
	public id?: number;
	public username: string;
	public password: string;
	public archived?: boolean;

	public constructor(data: IUser) {
		Object.assign(this, {
			...data,
		});
	}
}
