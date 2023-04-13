import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'keleman-keleman-dropzone',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
  templateUrl: './keleman-dropzone.component.html',
  styleUrls: ['./keleman-dropzone.component.scss'],
})
export class KelemanDropzoneComponent {
  @Input() multiple: boolean = false;
  @Input() accept: string = 'image/jpeg,image/jpg,image/png,image/gif';
  @Input() disabledClick: boolean = false;
  @Input() showSelectButton: boolean = false;
  @Input() selectButtonText: string = 'انتخاب فایل';
  @Input() isRequired: boolean = false;
  @Input() valid: boolean = true;

  @Output('onFileSelect') change = new EventEmitter<SelectedFiles>();

  acceptedFiles: File[] = [];
  rejectedFile: File[] = [];

  onFileSelect($event: NgxDropzoneChangeEvent) {
    this.acceptedFiles.push(...$event.addedFiles);
    this.rejectedFile.push(...$event.rejectedFiles);
    const resultSelectedFiles = {
      addedFiles: this.acceptedFiles,
      rejectedFiles: this.rejectedFile,
    } as SelectedFiles;
    this.change.emit(resultSelectedFiles);
  }

  removeFile($event: File) {
    const index = this.acceptedFiles.indexOf($event);
    this.acceptedFiles.splice(index, 1);
  }
}

export interface SelectedFiles {
  addedFiles: File[];
  rejectedFiles: File[];
}
