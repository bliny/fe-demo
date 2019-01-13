export class FileUploadTexts {
	browseText: string;
	dragDropText: string;
	fileSizeError: string;
	fileTypesError: string;

	constructor(browseText: string, dragDropText: string, fileSizeError: string, fileTypesError: string) {
		this.browseText = browseText;
		this.dragDropText = dragDropText;
		this.fileSizeError = fileSizeError;
		this.fileTypesError = fileTypesError;
	}
}
