import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();

		authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});

	it('should be able to authenticate', async () => {
		await createUser.execute({
			email: 'jhon@test.com',
			password: 'password',
		});

		const response = await authenticateUser.execute({
			email: 'jhon@test.com',
			password: 'password',
		});

		expect(response).toHaveProperty('token');
	});

	it('should not be able to authenticate with non existing user', async () => {
		await expect(
			authenticateUser.execute({
				email: 'jhon@test.com',
				password: 'password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		await createUser.execute({
			email: 'jhon@test.com',
			password: 'password',
		});

		await expect(
			authenticateUser.execute({
				email: 'jhon@test.com',
				password: 'wrong-password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
