import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	email: string;
	password: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ email, password }: IRequest): Promise<User> {
		const findUserWithSameEmail = await this.usersRepository.findByEmail(
			email,
		);

		if (findUserWithSameEmail) {
			throw new AppError(
				'There is already a registered user with this email.',
			);
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;
