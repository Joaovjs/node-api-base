import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
	private storage: string[] = [];

	public async saveFile(file: string, _: string): Promise<string> {
		this.storage.push(file);

		return file;
	}

	public async deleteFile(file: string, _: string): Promise<void> {
		const findIndex = this.storage.findIndex(
			storageFile => storageFile === file,
		);

		this.storage.splice(findIndex, 1);
	}
}

export default FakeStorageProvider;
