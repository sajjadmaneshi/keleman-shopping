import { NgModule } from '@angular/core';
import { ProductFiltersComponent } from './product-filters.component';
import { ProductPriceFilterComponent } from './components/product-price-filter/product-price-filter.component';
import { ProductFilterBottomSheetComponent } from './product-filter-bottom-sheet/product-filter-bottom-sheet.component';
import { FilterItemsComponent } from './components/filter-option/filter-items/filter-items.component';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../../../../mat-components.module';
import { ProductFilterService } from '../product-filter.service';
import { FiltersDialogComponent } from './product-filter-bottom-sheet/dialogs/filters-dialog/filters-dialog.component';
import { FilterChipListComponent } from './components/filter-chip-list/filter-chip-list.component';
import { FilterOptionComponent } from './components/filter-option/filter-option.component';
import { BottomSheetComponent } from '../../../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ActivatedRoute } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    ProductFiltersComponent,
    ProductPriceFilterComponent,
    ProductFilterBottomSheetComponent,
    FilterItemsComponent,
    FilterItemsComponent,
    FiltersDialogComponent,
    FilterChipListComponent,
    FilterOptionComponent,
  ],
  exports: [ProductFiltersComponent, ProductFilterBottomSheetComponent],
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
  providers: [ProductFilterService],
})
export class ProductFiltersModule {}
