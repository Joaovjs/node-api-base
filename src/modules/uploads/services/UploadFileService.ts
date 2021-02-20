import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
	uploadFileName: string;
	uploadFolder: string;
}

@injectable()
export default class UploadFileService {
	constructor(
		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
	) {}

	public async execute({
		uploadFileName,
		uploadFolder,
	}: IRequest): Promise<string> {
		if (uploadFolder !== 'uploads') {
			throw new AppError('Folder do not exist');
		}

		const fileName = await this.storageProvider.saveFile(
			uploadFileName,
			uploadFolder,
		);

		return fileName;
	}
}
