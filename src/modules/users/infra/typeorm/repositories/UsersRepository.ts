import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async create({ email, password }: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({
			email,
			password,
		});

		await this.ormRepository.save(user);

		return user;
	}

	public async findById(user_id: string): Promise<User | undefined> {
		const findUser = this.ormRepository.findOne(user_id);

		return findUser;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const findUser = await this.ormRepository.findOne({
			where: { email },
		});

		return findUser;
	}

	public async save(user: User): Promise<User> {
		this.ormRepository.save(user);

		return user;
	}
}

export default UsersRepository;
