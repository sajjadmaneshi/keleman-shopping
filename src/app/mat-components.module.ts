import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  exports: [
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatExpansionModule,
  ],
})
export class MatComponentsModule {}
