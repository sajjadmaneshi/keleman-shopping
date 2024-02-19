import { NgModule } from '@angular/core';
import { ProductFiltersComponent } from './product-filters.component';
import { ProductPriceFilterComponent } from './components/product-price-filter/product-price-filter.component';
import { FilterItemsComponent } from './components/filter-option/filter-items/filter-items.component';
import { CommonModule } from '@angular/common';
import { FiltersDialogComponent } from './components/filters-dialog/filters-dialog.component';
import { FilterOptionComponent } from './components/filter-option/filter-option.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatRadioModule } from '@angular/material/radio';

import { FilterOptionBottomSheetComponent } from './components/filter-option-bottom-sheet/filter-option-bottom-sheet.component';
import { MatComponentsModule } from '../../../../../mat-components.module';
import { BottomSheetComponent } from '../../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { FilterOptionService } from '../../../products/services/filter-option.service';

@NgModule({
  declarations: [
    ProductFiltersComponent,
    ProductPriceFilterComponent,
    FilterItemsComponent,
    FilterItemsComponent,
    FiltersDialogComponent,
    FilterOptionComponent,
    FilterOptionBottomSheetComponent,
  ],
  exports: [ProductFiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule,
    BottomSheetComponent,
    BottomSheetComponent,
    NgbAccordionModule,
    NgxSkeletonLoaderModule,
    MatRadioModule,
  ],
  providers: [FilterOptionService],
})
export class ProductFiltersModule {}
