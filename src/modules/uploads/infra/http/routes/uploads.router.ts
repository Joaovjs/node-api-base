import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UploadsController from '../controllers/UploadsController';
import authentication from '@modules/users/infra/http/middlewares/authentication';

const uploadsRouter = Router();
const upload = multer(uploadConfig.multer);
const uploadsController = new UploadsController();

uploadsRouter.use(authentication);
uploadsRouter.post('/', upload.single('file'), uploadsController.create);

export default uploadsRouter;
