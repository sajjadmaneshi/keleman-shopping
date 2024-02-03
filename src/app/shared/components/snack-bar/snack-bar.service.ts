import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SnackBarService {
  baseConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };
  constructor(private _snackBar: MatSnackBar) {}
  showDangerSnackBar(message: string, config?: MatSnackBarConfig) {
    this.openSnackBar({
      ...this.baseConfig,
      data: message,
      panelClass: [`danger-snackbar`],
    });
  }
  showSuccessSnackBar(message: string, config?: MatSnackBarConfig) {
    this.openSnackBar({
      ...this.baseConfig,
      ...config,
      data: message,
      panelClass: [`success-snackbar`],
    });
  }
  showWarningSnackBar(message: string, config?: MatSnackBarConfig) {
    this.openSnackBar({
      ...this.baseConfig,
      ...config,
      data: message,
      panelClass: [`warning-snackbar`],
    });
  }

  showPrimarySnackBar(message: string, config?: MatSnackBarConfig) {
    this.openSnackBar({
      ...this.baseConfig,
      ...config,
      data: message,
      panelClass: [`primary-snackbar`],
    });
  }

  showDarkSnackBar(message: string, config?: MatSnackBarConfig) {
    this.openSnackBar({ ...this.baseConfig, ...config, data: message });
  }
  showLightSnackBar(message: string, config?: MatSnackBarConfig) {
    this.openSnackBar({
      ...this.baseConfig,
      ...config,
      data: message,
      panelClass: [`light-snackbar`],
    });
  }

  openSnackBar(config?: MatSnackBarConfig) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      ...this.baseConfig,
      ...config,
      duration: 3000,
    });
  }
}
