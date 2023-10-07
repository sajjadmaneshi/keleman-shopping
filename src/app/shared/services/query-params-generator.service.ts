import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryParamGeneratorService {
  private queryParams: string[] = [];
  private _queryParamsOrder: string[] = [];

  constructor() {}

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
    const param = `q=${encodeURIComponent(value ?? '')}`;
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

  resetQueryParams(): void {
    this.queryParams = [];
  }
}
