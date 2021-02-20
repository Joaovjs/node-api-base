import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			password_confirm: Joi.string()
				.required()
				.valid(Joi.ref('password')),
		},
	}),
	usersController.create,
);

export default usersRouter;
