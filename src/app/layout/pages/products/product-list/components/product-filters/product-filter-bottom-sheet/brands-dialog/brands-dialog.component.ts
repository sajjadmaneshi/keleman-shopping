import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-brands-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './brands-dialog.component.html',
  styleUrls: ['../filter-dialogs.scss'],
  providers: [ProductFilterService],
})
export class BrandsDialogComponent implements OnInit {
  @Input() selected: any[] = [];
  selectedBrands: any[] = [];
  brands = [
    {
      title: 'الکو',
      id: 1,
      selected: false,
    },
    {
      title: 'روماتو',
      id: 2,
      selected: false,
    },
    {
      title: 'سیلور',
      id: 3,
      selected: false,
    },
    {
      title: 'پرو',
      id: 4,
      selected: false,
    },
    {
      title: 'آرتون',
      id: 5,
      selected: false,
    },
    {
      title: 'الکو',
      id: 6,
      selected: false,
    },
    {
      title: 'الکو',
      id: 7,
      selected: false,
    },
    {
      title: 'الکو',
      id: 8,
      selected: false,
    },
    {
      title: 'الکو',
      id: 9,
      selected: false,
    },
    {
      title: 'الکو',
      id: 10,
      selected: false,
    },
    {
      title: 'الکو',
      id: 11,
      selected: false,
    },
    {
      title: 'الکو',
      id: 12,
      selected: false,
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<BrandsDialogComponent>,
    private _productFilterService: ProductFilterService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.brands = this._productFilterService.determineSelectedFilters(
        this.data,
        this.brands
      );
      this.selectedBrands = [...this.data];
    }
  }

  onSelect(selectedBrand: any, checked: boolean) {
    this.selectedBrands = this._productFilterService.onSelect(
      selectedBrand,
      checked,
      this.brands
    );
  }
  submit() {
    this.dialogRef.close(this.selectedBrands);
  }
}
