import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { FileData } from './file-data';
import { FileUploadTexts } from './file-upload-text';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
	selector: 'file-upload',
	templateUrl: 'file-upload.component.html',
	styleUrls: ['file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
	errors: Array<string> = [];
	filesToUpload: Array<FileData> = [];
	dragAreaClass = 'dragarea';
	@Input()
	fileExt = 'JPG, GIF, PNG';
	@Input()
	texts: FileUploadTexts = new FileUploadTexts(
		'Click to browse',
		'Or Drag & Drop to upload your files',
		'Maximum file size is in MB: ',
		'Valid file types: '
	);
	@Input()
	maxFileSize = 1; // MB
	@Input()
  formArray: FormArray;
	@Input()
	formControlOfFiles: FormControl;
	@Input()
	submitted: boolean;
	@Output()
	onFilesChanged: EventEmitter<Array<FileData>> = new EventEmitter<Array<FileData>>();

	constructor() {}

	ngOnInit() {}

	onFileChange(event) {
		this.addFiles(event.target.files);
	}

	@HostListener('dragover', ['$event'])
	onDragOver(event) {
		this.dragAreaClass = 'droparea';
		event.preventDefault();
	}

	@HostListener('dragenter', ['$event'])
	onDragEnter(event) {
		this.dragAreaClass = 'droparea';
		event.preventDefault();
	}

	@HostListener('dragend', ['$event'])
	onDragEnd(event) {
		this.dragAreaClass = 'dragarea';
		event.preventDefault();
	}

	@HostListener('dragleave', ['$event'])
	onDragLeave(event) {
		this.dragAreaClass = 'dragarea';
		event.preventDefault();
	}

	@HostListener('drop', ['$event'])
	onDrop(event) {
		this.dragAreaClass = 'dragarea';
		event.preventDefault();
		event.stopPropagation();
		this.addFiles(event.dataTransfer.files);
	}

	onFileRemove(event: Event, index: number) {
		this.errors = [];
		this.filesToUpload.splice(index, 1);
		this.filesChanged(this.filesToUpload);
	}

	addFiles(files: Array<File>) {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (this.validate(file)) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const progressEvent = e as ProgressEvent;
					const fileReader = progressEvent.target as FileReader;
					const validatedFile = files[i];
					const fileData = new FileData(validatedFile, fileReader.result);
					if (this.filesToUpload.length > 0 && this.formControlOfFiles) {
						this.filesToUpload.pop();
					}
					this.filesToUpload.push(fileData);
					this.filesChanged(this.filesToUpload);
				};
				reader.readAsDataURL(file);
			}
		}
	}

	filesChanged(files: Array<FileData>) {
		this.onFilesChanged.emit(files);

		if (this.formArray) {
			console.log('1');
			this.formArray.controls = [];
			console.log('2');
			files.forEach((file) => {
				console.log('3');
				this.formArray.push(new FormControl(file.data, [Validators.required]));
			});
		}
		if (this.formControlOfFiles) {
			if (files && files.length > 0) {
				this.formControlOfFiles.setValue(files[0].data);
			} else {
				this.formControlOfFiles.reset('');
			}
		}
	}

	validate(file: File): boolean {
		this.errors = [];
		if (!this.isFileSizeValid(file)) {
			this.errors.push(this.texts.fileSizeError + ' ' + this.maxFileSize + ' ' + file.name);
		}
		if (!this.isFileExtensionValid(file)) {
			this.errors.push(this.texts.fileTypesError + ' ' + this.fileExt + ' ' + file.name);
		}
		return this.errors.length === 0;
	}

	private isFileSizeValid(file): boolean {
		const fileSizeinMB = file.size / (1024 * 1000);
		const size = Math.round(fileSizeinMB * 100) / 100;
		return size <= this.maxFileSize;
	}

	private isFileExtensionValid(file: File): boolean {
		const extensions = this.fileExt.split(',').map((x) => {
			return x.toLocaleUpperCase().trim();
		});
		const ext = file.name
			.split('.')
			.pop()
			.toLocaleUpperCase()
			.trim();
		return extensions.includes(ext);
	}
}
