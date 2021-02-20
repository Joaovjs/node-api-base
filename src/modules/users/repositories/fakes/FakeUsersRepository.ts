import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
	private users: User[] = [];

	public async create({ email, password }: ICreateUserDTO): Promise<User> {
		const user = new User();

		Object.assign(user, { id: uuid(), password, email });

		this.users.push(user);

		return user;
	}

	public async findById(user_id: string): Promise<User | undefined> {
		const findUser = this.users.find(user => user.id === user_id);

		return findUser;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const findUser = this.users.find(user => user.email === email);

		return findUser;
	}

	public async save(user: User): Promise<User> {
		const userIndex = this.users.findIndex(
			findUser => findUser.id === user.id,
		);

		this.users[userIndex] = user;

		return user;
	}
}

export default FakeUsersRepository;
