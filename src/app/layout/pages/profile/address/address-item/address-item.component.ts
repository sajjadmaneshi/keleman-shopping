import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { KelemanMapComponent } from '../../../../../shared/components/keleman-map/keleman-map.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserAddressViewModel } from '../../data/view-models/user-address.view-model';
import { ProfileRepository } from '../../data/profile.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../../../shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogDataModel } from '../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { ModifyAddressDialogComponent } from '../add-address-dialog/modify-address-dialog.component';
import { LoadingService } from '../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    KelemanMapComponent,
    NgbTooltip,
    MatProgressSpinnerModule,
    NgIf,
    AsyncPipe,
  ],
})
export class AddressItemComponent {
  @Input() address!: UserAddressViewModel;
  @Input() deletable = true;
  @Input() editable = true;
  @Input() canSetDefault = true;

  @Output('addToDefault') onAddToDefault = new EventEmitter<number>();
  @Output('delete') onDelete = new EventEmitter<void>();
  @Output('update') onUpdate = new EventEmitter<void>();

  destroy$ = new Subject<void>();
  dialogRef!: MatDialogRef<AlertDialogComponent>;

  constructor(
    public readonly loadingService: LoadingService,
    private readonly _profuleRepository: ProfileRepository,
    private readonly _dialog: MatDialog
  ) {}

  getMarkerLatLng(lat: number, lng: number): any {
    return { lat, lng };
  }

  openEditDialog() {
    this._dialog
      .open(ModifyAddressDialogComponent, {
        width: '700px',
        autoFocus: false,
        data: this.address,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onUpdate.emit());
  }

  public getAcceptBeforeRemove($event: any) {
    $event.stopPropagation();
    this.dialogRef = this._dialog.open(AlertDialogComponent, {
      autoFocus: false,
      data: {
        message: 'آیا  از حذف آدرس  مطمئن می باشید؟',
        callBackButtonText: 'حذف ',
        cancelButtonText: 'انصراف',
        callBackFunction: () => this._delete(),
      } as AlertDialogDataModel,
    });
  }

  private _delete() {
    this.loadingService.startLoading('delete', 'deleteAddress');
    this._profuleRepository
      .deleteAddress(this.address.id)
      .pipe(
        tap(() => {
          this.loadingService.stopLoading('delete', 'deleteAddress');
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.onDelete.emit();
        },
        error: () => this.loadingService.stopLoading('delete', 'deleteAddress'),
      });
  }
}
