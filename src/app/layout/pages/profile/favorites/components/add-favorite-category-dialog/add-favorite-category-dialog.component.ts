import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'keleman-add-favorite-category-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-favorite-category-dialog.component.html',
  styleUrls: ['./add-favorite-category-dialog.component.scss'],
})
export class AddFavoriteCategoryDialogComponent {
  favoriteCategoryForm!: FormGroup;
  selectedColor = 'success';

  public get title(): FormControl {
    return this.favoriteCategoryForm.get('title') as FormControl;
  }

  public get color(): FormControl {
    return this.favoriteCategoryForm.get('color') as FormControl;
  }

  constructor(
    private _dialogRef: MatDialogRef<AddFavoriteCategoryDialogComponent>
  ) {
    this._initForm();
  }

  private _initForm() {
    this.favoriteCategoryForm = new FormGroup<any>({
      title: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });
  }

  selectColor(
    color:
      | 'danger'
      | 'success'
      | 'warning'
      | 'info'
      | 'gray-400'
      | 'black'
      | 'white'
  ) {
    this.color.patchValue(color);
    this.selectedColor = color;
  }
}
