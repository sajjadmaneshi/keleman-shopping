import { Inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';

import { ArticleRepository } from '../../layout/pages/magazine/data/repositories/article.repository';
import { ProductRepository } from '../../layout/pages/products/data/repositories/product.repository';
import { HttpClientResult } from '../data/models/http/http-client.result';
import { ArticleSearchResult, ProductSearchResult } from './search.service';
export const REPOSITORY_TOKEN = new InjectionToken<
  ArticleRepository | ProductRepository
>('repositoryToken');
@Injectable()
export class BaseDataFetcherService<
  T extends ProductSearchResult | ArticleSearchResult
> {
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(REPOSITORY_TOKEN)
    private _repository: ProductRepository | ArticleRepository
  ) {}

  fetchData(params: { [key: string]: any }): Observable<T | undefined> {
    this.isLoading = true;

    return (
      this._repository.search(params) as Observable<HttpClientResult<T>>
    ).pipe(
      tap(() => (this.isLoading = false)),
      takeUntil(this.destroy$),
      map((x) => x.result)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
