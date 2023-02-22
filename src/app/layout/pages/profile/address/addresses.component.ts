import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressDialogComponent } from './add-address-dialog/add-address-dialog.component';
import { AddressModel } from './data/models/address.model';

@Component({
  selector: 'keleman-address',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  myAddresses: AddressWithSelected[] = [
    {
      lat: 29.56,
      lng: 57.6,
      address:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است ',
      selected: true,
      name: 'خانه',
    },
    {
      lat: 29.56,
      lng: 30.0,
      address:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است',
      selected: false,
      name: 'تست',
    },
    {
      lat: 32,
      lng: 58.6,
      address:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است',
      selected: false,
      name: 'محل کار',
    },
  ];
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddAddressDialogComponent, {
      width: '700px',
      panelClass: 'address-container',
      autoFocus: false,
    });
  }
}
export interface AddressWithSelected extends AddressModel {
  selected: boolean;
}
