import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import responseObjectDefault from '@shared/utils/response.utils';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AuthController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email, password } = request.body;
		const authenticateUser = container.resolve(AuthenticateUserService);

		const { user, token } = await authenticateUser.execute({
			email,
			password,
		});

		const userWithToken = {
			...classToClass(user),
			key: token,
		};

		const responseObject = responseObjectDefault({ data: userWithToken });

		return response.json(responseObject);
	}
}
