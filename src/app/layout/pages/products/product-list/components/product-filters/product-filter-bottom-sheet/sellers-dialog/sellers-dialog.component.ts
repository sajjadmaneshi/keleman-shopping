import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-sellers-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './sellers-dialog.component.html',
  styleUrls: ['../filter-dialogs.scss'],
  providers: [ProductFilterService],
})
export class SellersDialogComponent implements OnInit {
  selectedSellers: any[] = [];

  sellers = [
    {
      id: 1,
      title: 'کلمان',
      selected: false,
    },
    {
      id: 2,
      title: 'روماتو',
      selected: false,
    },
    {
      id: 3,
      title: 'سیلور',
      selected: false,
    },
    {
      id: 4,
      title: 'پرو',
      selected: false,
    },
    {
      id: 5,
      title: 'آرتون',
      selected: false,
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<SellersDialogComponent>,
    private _productFilterService: ProductFilterService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.sellers = this._productFilterService.determineSelectedFilters(
        this.data,
        this.sellers
      );
      this.selectedSellers = [...this.data];
    }
  }

  onSelect(selectedSeller: any, checked: boolean) {
    this.selectedSellers = this._productFilterService.onSelect(
      selectedSeller,
      checked,
      this.sellers
    );
  }

  submit() {
    this.dialogRef.close(this.selectedSellers);
  }
}
