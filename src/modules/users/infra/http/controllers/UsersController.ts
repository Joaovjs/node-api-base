import CreateUserService from '@modules/users/services/CreateUserService';
import responseObjectDefault from '@shared/utils/response.utils';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email, password } = request.body;

		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute({
			email,
			password,
		});

		const responseObject = responseObjectDefault({
			data: classToClass(user),
		});

		return response.json(responseObject);
	}
}
