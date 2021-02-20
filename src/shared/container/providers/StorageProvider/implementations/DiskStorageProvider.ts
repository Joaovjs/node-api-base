import fs from 'fs';
import path from 'path';
import UploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
	public async saveFile(file: string, folder = 'uploads'): Promise<string> {
		await fs.promises.rename(
			path.resolve(UploadConfig.tmpFolder, file),
			path.resolve(path.resolve(UploadConfig.tmpFolder, folder), file),
		);

		return file;
	}

	public async deleteFile(file: string, folder = 'uploads'): Promise<void> {
		const filePath = path.resolve(UploadConfig.tmpFolder, folder, file);

		try {
			await fs.promises.stat(filePath);
		} catch {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}

export default DiskStorageProvider;
