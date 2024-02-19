import { Injectable } from '@angular/core';
import { ProductCategoryViewModel } from '../../../shared/data/models/view-models/product-category.view-model';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Routing } from '../../../routing';
import { Router } from '@angular/router';
import { ProductCategoryRepository } from '../../../layout/pages/products/data/repositories/product-category.repository';
import { LoadingService } from '../../../../common/services/loading.service';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
  constructor(
    private _productCategoryRepository: ProductCategoryRepository,
    private _router: Router,
    public loadingService: LoadingService
  ) {
    this.loadingService.startLoading('read', 'productCategories');
  }

  public getCategories(
    parentId?: number
  ): Observable<ProductCategoryViewModel[]> {
    return this._productCategoryRepository.getAllWithChildrens(parentId).pipe(
      tap(() =>
        setTimeout(
          () => this.loadingService.stopLoading('read', 'productCategories'),
          1500
        )
      ),
      map((result) => {
        return result.result!;
      }),
      catchError(() => {
        this.loadingService.stopLoading('read', 'productCategories');
        return of([]);
      })
    );
  }

  onNavigate(url: string) {
    const queryParams = { p: '0' };

    this._router
      .navigate([`${Routing.productCategory}/${url}`], {
        queryParams,
      })
      .finally();
  }
}
