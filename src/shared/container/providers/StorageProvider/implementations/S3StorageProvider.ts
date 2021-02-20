import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import UploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
	private client: S3;

	constructor() {
		this.client = new aws.S3({
			region: 'us-east-2',
		});
	}

	public async saveFile(file: string, folder = 'uploads'): Promise<string> {
		const originalPath = path.resolve(UploadConfig.tmpFolder, file);

		const ContentType = mime.getType(originalPath);

		if (!ContentType) {
			throw new Error('File not found');
		}

		const fileContent = await fs.promises.readFile(originalPath);

		await this.client
			.putObject({
				Bucket: UploadConfig.config.aws.bucket,
				Key: `${folder}/${file}`,
				ACL: 'public-read',
				Body: fileContent,
				ContentType,
				ContentDisposition: `inline; filename=${file}`,
			})
			.promise();

		await fs.promises.unlink(originalPath);

		return file;
	}

	public async deleteFile(file: string, folder = 'uploads'): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: UploadConfig.config.aws.bucket,
				Key: `${folder}/${file}`,
			})
			.promise();
	}
}

export default S3StorageProvider;
