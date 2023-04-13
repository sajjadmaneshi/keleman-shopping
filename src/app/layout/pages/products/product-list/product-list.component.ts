import { Component } from '@angular/core';
import { ProductRepository } from '../data/repositories/product.repository';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from '../../../../shared/common/app-error-handler';
import { AppErrors } from '../../../../shared/common/app-errors';

@Component({
  selector: 'keleman-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductRepository],
})
export class ProductListComponent {
  products: ProductViewModel[] = [];

  subscription = new Subscription();
  constructor(private _repository: ProductRepository) {
    const getAll$ = this._repository.getAll().subscribe({
      next: (result: ProductViewModel[]) => {
        this.products = result;
      },
      error: (error) => {
        throw new AppErrors(error);
      },
    });
    this.subscription.add(getAll$);
  }
}
