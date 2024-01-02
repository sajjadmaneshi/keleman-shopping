import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { RouteHandlerService } from './route-handler/route-handler.service';

@Injectable({
  providedIn: 'root',
})
export class QueryParamGeneratorService {
  private queryParams: string[] = [];

  constructor(private _routerHandlerService: RouteHandlerService) {}

  private addToQueryParams(param: string): void {
    this.queryParams.push(param);
  }

  generateQueryParam(
    key: string,
    value: string | number
  ): QueryParamGeneratorService {
    const param = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    this.addToQueryParams(param);
    return this;
  }

  generateSearchQueryParam(value?: string): QueryParamGeneratorService {
    const key = 'q';
    const param = `${key}=${encodeURIComponent(value ?? '')}`;
    this.addToQueryParams(param);
    return this;
  }

  generateGreaterThanQueryParam(
    key: string,
    value: number
  ): QueryParamGeneratorService {
    const param = `${encodeURIComponent(key)}>${encodeURIComponent(value)}`;
    this.addToQueryParams(param);
    return this;
  }

  generateLessThanQueryParam(
    key: string,
    value: number
  ): QueryParamGeneratorService {
    const param = `${encodeURIComponent(key)}<${encodeURIComponent(value)}`;
    this.addToQueryParams(param);
    return this;
  }

  generateObjectToQueryParam(obj: {
    [key: string]: string;
  }): QueryParamGeneratorService {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value !== undefined && value !== null && value !== '') {
          this.generateQueryParam(key, value);
        }
      }
    }
    return this;
  }

  getQueryParams(): string {
    if (this.queryParams.length === 0) {
      return '';
    }
    return this.queryParams.join('&');
  }

  public sortQuryParams(queryParams: Params) {
    const sortedKeys = Object.keys(queryParams).sort();
    const sortedQueryParams = {} as Params;
    sortedKeys.forEach((key) => {
      sortedQueryParams[key] = queryParams[key];
    });

    return sortedQueryParams;
  }

  public fixQueryParamsOrderInUrl() {
    let params = this._routerHandlerService.getQueryParamsSnapShot;
    if (!this._hasPageParam(params)) params = { ...params, p: 0 };
    this._routerHandlerService.updateQueryParams(this.sortQuryParams(params));
  }

  private _hasPageParam(params: Params) {
    return params['p'] != undefined;
  }

  resetQueryParams(): void {
    this.queryParams = [];
  }
}
