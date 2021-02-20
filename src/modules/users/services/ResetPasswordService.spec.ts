import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordEmail', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeUsersTokensRepository = new FakeUsersTokensRepository();
		fakeHashProvider = new FakeHashProvider();

		resetPassword = new ResetPasswordService(
			fakeUsersRepository,
			fakeUsersTokensRepository,
			fakeHashProvider,
		);
	});

	it('should be able to reset the password', async () => {
		const user = await fakeUsersRepository.create({
			email: 'jhon@test.com',
			password: 'password',
		});

		const { token } = await fakeUsersTokensRepository.generate(user.id);

		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

		await resetPassword.execute({
			password: 'newpassword',
			token,
		});

		const updatedUser = await fakeUsersRepository.findById(user.id);

		expect(generateHash).toHaveBeenCalledWith('newpassword');
		expect(updatedUser?.password).toBe('newpassword');
	});

	it('should not be able to reset the password with non-existing token', async () => {
		await expect(
			resetPassword.execute({
				token: 'non-existing-token',
				password: 'newpassword',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password with non-existing user', async () => {
		const { token } = await fakeUsersTokensRepository.generate(
			'non-existing-user',
		);

		await expect(
			resetPassword.execute({
				token,
				password: 'newpassword',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password if passed more than 1 hour', async () => {
		const user = await fakeUsersRepository.create({
			email: 'jhon@test.com',
			password: 'password',
		});

		const { token } = await fakeUsersTokensRepository.generate(user.id);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			const customDate = new Date();

			return customDate.setHours(customDate.getHours() + 2);
		});

		await expect(
			resetPassword.execute({
				password: 'newpassword',
				token,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
