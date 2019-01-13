export class FileData {
	file: File;
	data: string | ArrayBuffer;

	constructor(file: File, data: string | ArrayBuffer) {
		this.file = file;
		this.data = data;
	}
}
