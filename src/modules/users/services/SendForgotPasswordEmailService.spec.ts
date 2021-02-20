import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeMailProvider = new FakeMailProvider();
		fakeUsersTokensRepository = new FakeUsersTokensRepository();

		sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
			fakeUsersTokensRepository,
		);
	});

	it('should be able recover the password using the email', async () => {
		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

		await fakeUsersRepository.create({
			email: 'jhon@test.com',
			password: 'password',
		});

		await sendForgotPasswordEmail.execute({
			email: 'jhon@test.com',
		});

		expect(sendMail).toHaveBeenCalled();
	});

	it('should not be able to recover a non-existing user', async () => {
		await expect(
			sendForgotPasswordEmail.execute({
				email: 'jhon@test.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should generate a forgot password token', async () => {
		const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate');

		const user = await fakeUsersRepository.create({
			email: 'jhon@test.com',
			password: 'password',
		});

		await sendForgotPasswordEmail.execute({
			email: 'jhon@test.com',
		});

		expect(generateToken).toHaveBeenCalledWith(user.id);
	});
});
