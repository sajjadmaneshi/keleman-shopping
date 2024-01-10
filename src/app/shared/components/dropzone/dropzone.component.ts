import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'keleman-dropzone',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, MatProgressSpinnerModule],
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {
  @Input() multiple: boolean = false;
  @Input() accept: string = 'image/jpeg,image/jpg,image/png,image/gif';
  @Input() disabledClick: boolean = false;
  @Input() showSelectButton: boolean = false;
  @Input() selectButtonText: string = 'انتخاب فایل';
  @Input() isRequired: boolean = false;
  @Input() invalid: boolean = false;
  @Input() loading = false;

  @Output('onFileSelect') change = new EventEmitter<SelectedFiles>();
  @Output('onRemove') remove = new EventEmitter<File>();

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
    this.remove.emit($event);
  }
}

export interface SelectedFiles {
  addedFiles: File[];
  rejectedFiles: File[];
}
