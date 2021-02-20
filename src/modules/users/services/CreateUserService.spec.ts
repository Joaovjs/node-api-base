import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();

		createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});

	it('should be able to create a new user', async () => {
		const user = await createUser.execute({
			email: 'jhon@test.com',
			password: 'password',
		});

		expect(user).toHaveProperty('id');
		expect(user.email).toBe('jhon@test.com');
	});

	it('should not be able to create two users with the same email', async () => {
		const userData = {
			email: 'jhon@test.com',
			password: 'password',
		};

		await createUser.execute(userData);

		await expect(createUser.execute(userData)).rejects.toBeInstanceOf(
			AppError,
		);
	});
});
