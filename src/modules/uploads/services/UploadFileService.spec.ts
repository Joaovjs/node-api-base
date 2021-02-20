import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UploadFileService from './UploadFileService';

let fakeStorageProvider: FakeStorageProvider;
let uploadFile: UploadFileService;

describe('UploadFile', () => {
	beforeEach(() => {
		fakeStorageProvider = new FakeStorageProvider();

		uploadFile = new UploadFileService(fakeStorageProvider);
	});

	it('should be able to upload a file', async () => {
		const file = await uploadFile.execute({
			uploadFileName: 'file.jpg',
			uploadFolder: 'uploads',
		});

		expect(file).toBe('file.jpg');
	});

	it('should not be able to upload a file in a non existing folder', async () => {
		await expect(
			uploadFile.execute({
				uploadFileName: 'file.jpg',
				uploadFolder: 'non-existing',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
