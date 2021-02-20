import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import responseObjectDefault from '@shared/utils/response.utils';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email } = request.body;
		const sendForgotPasswordEmail = container.resolve(
			SendForgotPasswordEmailService,
		);

		await sendForgotPasswordEmail.execute({
			email,
		});

		const responseObject = responseObjectDefault({
			data: null,
			http_status: 204,
		});

		return response.status(204).json(responseObject);
	}
}
