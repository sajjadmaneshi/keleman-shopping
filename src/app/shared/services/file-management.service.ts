import { Injectable, Renderer2 } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { FileUnit } from '../enums/file-unit.enum';
import { FileExtension } from '../enums/file-extension.enum';
import { SnackBarService } from '../components/snack-bar/snack-bar.service';

@Injectable()
export class FileManagementService {
  fileUploading = new BehaviorSubject(false);
  uploadedFileId = new BehaviorSubject<string | undefined>(undefined);

  public imageFileAccepts = [
    FileExtension.image_bmp,
    FileExtension.image_jpeg,
    FileExtension.image_jpg,
    FileExtension.image_png,
    FileExtension.image_pjpeg,
    FileExtension.image_pjp,
    FileExtension.image_jfif,
  ];

  constructor(private _snackBarService: SnackBarService) {}

  public generateAcceptedImageTypes = (): string =>
    this.imageFileAccepts.join(',');

  public checkFileSize(file: File): boolean {
    return this.validateSize(file.size, 300, FileUnit.KB);
  }

  public showTooLargeFileToast(): void {
    const toastFileTooLargeText = `حجم فایل انتخاب شده بیش از 300KB  می باشد.`;
    this._snackBarService.showDangerSnackBar(toastFileTooLargeText);
  }

  openFileBrowser($event: any, elRef: HTMLInputElement): void {
    $event.preventDefault();
    elRef.click();
  }

  public validateSize(
    fileSize: number,
    validSize: number,
    fileUnit: FileUnit = FileUnit.Bytes
  ): boolean {
    if (fileSize) {
      let size = fileSize;

      const marker = 1024;
      const kiloBytes = marker;
      const megaBytes = marker * marker;
      const gigaBytes = marker * marker * marker;
      const teraBytes = marker * marker * marker * marker;

      switch (fileUnit) {
        case FileUnit.KB:
          size = size / kiloBytes;
          break;
        case FileUnit.MB:
          size = size / megaBytes;
          break;
        case FileUnit.GB:
          size = size / gigaBytes;
          break;
        case FileUnit.TB:
          size = size / teraBytes;
          break;
      }

      return size < validSize;
    }

    return false;
  }
}
