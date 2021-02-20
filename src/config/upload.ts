import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
	driver: 'disk';
	tmpFolder: string;
	multer: { storage: StorageEngine };
	config: {
		aws: {
			bucket: string;
		};
	};
}

export default {
	driver: process.env.STORAGE_DRIVER,
	tmpFolder,
	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename(request, file, callback) {
				const fileHash = crypto.randomBytes(10).toString('hex');
				const fileName = `${fileHash}-${file.originalname}`;
				return callback(null, fileName);
			},
		}),
	},
	config: {
		aws: {
			bucket: process.env.AWS_BUCKET,
		},
	},
} as IUploadConfig;