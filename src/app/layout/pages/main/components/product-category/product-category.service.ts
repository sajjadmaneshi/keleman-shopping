import { Injectable } from '@angular/core';
import { ProductRepository } from '../../../products/data/repositories/product.repository';
import { ProductCategoryViewModel } from '../../../../../shared/data/models/view-models/product-category.view-model';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { BehaviorSubject, tap } from 'rxjs';
import { Routing } from '../../../../../routing';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
  constructor(
    private _productRepository: ProductRepository,
    private _router: Router
  ) {}
  assetsBaseUrl =
    'assets/media/static-resources/categories-without-background/';
  isLoading = new BehaviorSubject(false);

  public getCategories(parentId: number): Promise<ProductCategoryViewModel[]> {
    this.isLoading.next(true);
    return new Promise((resolve, reject) => {
      this._productRepository
        .getAllProductCategoriesWithChildrens(parentId)
        .pipe(tap(() => this.isLoading.next(false)))
        .subscribe(
          (result: HttpClientResult<ProductCategoryViewModel[]>) => {
            resolve(result.result!);
          },
          (err) => reject(err)
        );
    });
  }

  onNavigate({ c1, c2, c3 }: { c1?: string; c2?: string; c3?: string }) {
    const params = `${c1 ?? ''}/${c2 ?? ''}/${c3 ?? ''}`.replace(
      /\/{2,}/g,
      '/'
    ); // Remove consecutive slashes if any

    const queryParams = { p: '0' };

    this._router.navigate([`${Routing.products}/${params}`], { queryParams });
  }
}
