import { Component } from '@angular/core';
import { AddFavoriteCategoryDialogComponent } from '../add-favorite-category-dialog/add-favorite-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'keleman-favorite-categories',
  templateUrl: './favorite-categories.component.html',
  styleUrls: ['./favorite-categories.component.scss'],
})
export class FavoriteCategoriesComponent {
  categories: any[] = [
    {
      text: 'دسته 1',
      color: 'success',
    },
    {
      text: 'دسته 2',
      color: 'danger',
    },
    {
      text: 'دسته 3',
      color: 'info',
    },
    {
      text: 'دسته 4',
      color: 'warning',
    },
  ];

  constructor(public dialog: MatDialog) {}
  addNewCategory() {
    this.dialog.open(AddFavoriteCategoryDialogComponent, {
      width: '550px',
      autoFocus: false,
      panelClass: 'custom-mat-dialog',
    });
  }
}
