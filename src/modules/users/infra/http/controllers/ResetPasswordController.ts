import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import responseObjectDefault from '@shared/utils/response.utils';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { password, token } = request.body;
		const resetPassword = container.resolve(ResetPasswordService);

		await resetPassword.execute({
			token,
			password,
		});

		const responseObject = responseObjectDefault({
			data: null,
			http_status: 204,
		});

		return response.status(204).json(responseObject);
	}
}
