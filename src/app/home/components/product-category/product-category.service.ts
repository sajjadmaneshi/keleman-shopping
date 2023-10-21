import { Injectable } from '@angular/core';
import { ProductRepository } from '../../../layout/pages/products/data/repositories/product.repository';
import { ProductCategoryViewModel } from '../../../shared/data/models/view-models/product-category.view-model';
import { HttpClientResult } from '../../../shared/data/models/http/http-client.result';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Routing } from '../../../routing';
import { Router } from '@angular/router';
import { ProductCategoryRepository } from '../../../layout/pages/products/data/repositories/product-category.repository';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
  constructor(
    private _productCategoryRepository: ProductCategoryRepository,
    private _router: Router
  ) {}

  isLoading = new BehaviorSubject(false);

  public getCategories(
    parentId?: number
  ): Observable<ProductCategoryViewModel[]> {
    this.isLoading.next(true);
    return this._productCategoryRepository.getAllWithChildrens(parentId).pipe(
      tap(() => setTimeout(() => this.isLoading.next(false), 1500)),
      map((result) => {
        return result.result!;
      })
    );
  }

  onNavigate({ c1, c2, c3 }: { c1?: string; c2?: string; c3?: string }) {
    const params = `${c1 ?? ''}/${c2 ?? ''}/${c3 ?? ''}`.replace(
      /\/{2,}/g,
      '/'
    ); // Remove consecutive slashes if any
    const queryParams = { p: '0' };
    this._router
      .navigate([`${Routing.products}/${params}`], { queryParams })
      .finally();
  }
}
