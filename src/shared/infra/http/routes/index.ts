import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import uploadsRouter from '@modules/uploads/infra/http/routes/uploads.router';
import authentication from '@modules/users/infra/http/middlewares/authentication';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);

routes.use(authentication);
routes.use('/uploads', uploadsRouter);

export default routes;
