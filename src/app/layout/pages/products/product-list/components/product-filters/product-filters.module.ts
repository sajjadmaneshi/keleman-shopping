import { NgModule } from '@angular/core';
import { ProductFiltersComponent } from './product-filters.component';
import { ProductPriceFilterComponent } from './components/product-price-filter/product-price-filter.component';
import { ProductFilterBottomSheetComponent } from './product-filter-bottom-sheet/product-filter-bottom-sheet.component';
import { BrandFilterItemsComponent } from './shared/brand-filter-items/brand-filter-items.component';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../../../../mat-components.module';
import { ProductFilterService } from '../product-filter.service';
import { SellerFilterItemsComponent } from './shared/seller-filter-items/seller-filter-items.component';
import { CategoryFilterItemsComponent } from './shared/category-filter-items/category-filter-items.component';
import { SellersDialogComponent } from './product-filter-bottom-sheet/dialogs/sellers-dialog/sellers-dialog.component';
import { CategoryDialogComponent } from './product-filter-bottom-sheet/dialogs/category-dialog/category-dialog.component';
import { BrandsDialogComponent } from './product-filter-bottom-sheet/dialogs/brands-dialog/brands-dialog.component';
import { SellerFilterComponent } from './components/seller-filter/seller-filter.component';
import { FilterChipListComponent } from './components/filter-chip-list/filter-chip-list.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { BrandFilterComponent } from './components/brand-filter/brand-filter.component';
import { BottomSheetComponent } from '../../../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductFiltersComponent,
    ProductPriceFilterComponent,
    ProductFilterBottomSheetComponent,
    BrandFilterItemsComponent,
    SellerFilterItemsComponent,
    BrandFilterItemsComponent,
    CategoryFilterItemsComponent,
    SellersDialogComponent,
    CategoryDialogComponent,
    BrandsDialogComponent,
    FilterChipListComponent,
    SellerFilterComponent,
    CategoryFilterComponent,
    BrandFilterComponent,
  ],
  exports: [ProductFiltersComponent, ProductFilterBottomSheetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule,
    BottomSheetComponent,
    BottomSheetComponent,
  ],
  providers: [ProductFilterService],
})
export class ProductFiltersModule {}
