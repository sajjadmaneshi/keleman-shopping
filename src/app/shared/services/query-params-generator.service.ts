import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QueryParamGeneratorService {
  private queryParams: string[] = [];

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
    [key: string]: any;
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

  resetQueryParams(): void {
    this.queryParams = [];
  }
}
