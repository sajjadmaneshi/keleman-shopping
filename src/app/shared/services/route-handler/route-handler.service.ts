import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleRepository } from '../../../layout/pages/magazine/data/repositories/article.repository';
import { ProductRepository } from '../../../layout/pages/products/data/repositories/product.repository';

@Injectable({ providedIn: 'root' })
export class RouteHandlerService {
  constructor(private route: ActivatedRoute, private router: Router) {}

  // Read data from the current route
  getData(): Observable<any> {
    return this.route.data;
  }

  // Get query parameters
  getQueryParams(): Observable<Params> {
    return this.route.queryParams;
  }
  get getQueryParamsSnapShot(): Params {
    return this.route.snapshot.queryParams;
  }

  // Get route parameters
  getRouteParams(): Observable<Params> {
    return this.route.params;
  }
  getRouteParamsSnapShot(): Params {
    return this.route.snapshot.params;
  }

  // Update query parameters
  updateQueryParams(params: any, url?: string): void {
    this.router
      .navigate(url ? [url] : [], {
        relativeTo: url ? null : this.route,
        queryParams: params,
      })
      .finally();
  }

  // Update route parameters
  updateRouteParams(params: any): void {
    this.router.navigate([params], {
      relativeTo: this.route,
    });
  }
}
