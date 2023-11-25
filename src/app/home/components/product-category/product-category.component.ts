import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductCategoryService } from './product-category.service';
import { CommonModule } from '@angular/common';
import { ProductCategoryItemComponent } from './product-category-item/product-category-item.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../shared/directives/swiper-template.directive';
import { SwiperComponent } from '../../../shared/components/swiper/swiper.component';
import { ProductCategoryViewModel } from '../../../shared/data/models/view-models/product-category.view-model';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'keleman-product-categories',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],

  imports: [
    CommonModule,
    ProductCategoryItemComponent,
    SwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
  ],
  standalone: true,
})
export class ProductCategoryComponent implements OnChanges, OnDestroy {
  @Input() parentId!: number | null;

  @Output() onItemClick = new EventEmitter<ProductCategoryViewModel>();

  categories: ProductCategoryViewModel[] = [];

  subscription!: Subscription;

  constructor(
    public productCategoryService: ProductCategoryService,
    private _applicationState: ApplicationStateService
  ) {}
  private previousValue: any;
  inputHasChanged: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      const currentValue = changes['parentId'].currentValue;
      if (currentValue !== this.previousValue) {
        this.inputHasChanged = true;
        this._getCategories();
      }
      this.previousValue = currentValue;
    }
  }

  tranckByFn(index: number, item: ProductCategoryViewModel) {
    return item.id;
  }

  getCategoryProducts(category: ProductCategoryViewModel) {
    this.onItemClick.emit(category);
  }

  private _getCategories() {
    this.subscription = this.productCategoryService
      .getCategories(this.parentId!)
      .subscribe((result) => {
        this.categories = result;
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
