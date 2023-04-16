import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-category-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './category-dialog.component.html',
  styleUrls: ['../filter-dialogs.scss'],
  providers: [ProductFilterService],
})
export class CategoryDialogComponent {
  @Input() selected: any[] = [];
  selectedCategories: any[] = [];
  categories = [
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
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    private _productFilterService: ProductFilterService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.categories = this._productFilterService.determineSelectedFilters(
        this.data,
        this.categories
      );
      this.selectedCategories = [...this.data];
    }
  }

  onSelect(selectedCategory: any, checked: boolean) {
    this.selectedCategories = this._productFilterService.onSelect(
      selectedCategory,
      checked,
      this.categories
    );
  }

  submit() {
    this.dialogRef.close(this.selectedCategories);
  }
}
