import UploadFileService from '@modules/uploads/services/UploadFileService';
import responseObjectDefault from '@shared/utils/response.utils';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UploadsController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { filename } = request.file;

		const uploadFile = container.resolve(UploadFileService);

		const fileName = await uploadFile.execute({
			uploadFileName: filename,
			uploadFolder: 'uploads',
		});

		const responseObject = responseObjectDefault({ data: fileName });

		return response.json(responseObject);
	}
}
