import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';

import { LatLngExpression } from 'leaflet';
import { MatIconModule } from '@angular/material/icon';
import { KelemanMapComponent } from '../../../../../shared/components/keleman-map/keleman-map.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserAddressViewModel } from '../../data/view-models/user-address.view-model';
import { ProfileRepository } from '../../data/profile.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../../../shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogDataModel } from '../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { ModifyAddressDialogComponent } from '../add-address-dialog/modify-address-dialog.component';

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
  ],
})
export class AddressItemComponent {
  isLoading = false;
  deleteLoading = false;
  destroy$ = new Subject<void>();
  @Input() address!: UserAddressViewModel;
  @Input() deletable = true;
  @Input() editable = true;
  @Input() canSetDefault = true;

  @Output('addToDefault') onAddToDefault = new EventEmitter<number>();
  @Output('delete') onDelete = new EventEmitter<void>();
  @Output('update') onUpdate = new EventEmitter<void>();

  dialogRef!: MatDialogRef<AlertDialogComponent>;
  isBrowser!: boolean;

  constructor(
    private readonly _profuleRepository: ProfileRepository,
    @Inject(PLATFORM_ID) private platformId: any,
    private _dialog: MatDialog
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getMarkerLatLng(lat: number, lng: number): LatLngExpression {
    return { lat, lng } as LatLngExpression;
  }

  openEditDialog() {
    this._dialog
      .open(ModifyAddressDialogComponent, {
        width: '700px',
        autoFocus: false,
        data: this.address,
      })
      .afterClosed()
      .subscribe(() => this.onUpdate.emit());
  }

  addToDefault(id: number) {
    this._profuleRepository
      .addDefaultAddress(id)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.onAddToDefault.emit(this.address.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
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
    this._profuleRepository
      .deleteAddress(this.address.id)
      .pipe(
        tap(() => {
          this.deleteLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.dialogRef.close();
        this.onDelete.emit();
      });
  }
}
