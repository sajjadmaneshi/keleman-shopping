import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryParamGeneratorService {
  private queryParams: string[] = [];
  private _queryParamsOrder: string[] = [];

  constructor() {}

  get queryParamsOrder(): string[] {
    return this._queryParamsOrder;
  }

  set queryParamsOrder(value: string[]) {
    this._queryParamsOrder = value;
  }

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

  areQueryParamsInOrder(currentParams: string[]): boolean {
    return (
      currentParams.length === this.queryParamsOrder.length &&
      currentParams.every(
        (param, index) => param === this.queryParamsOrder[index]
      )
    );
  }

  public constructCorrectQueryParams(queryParams: Params): Params {
    const correctedQueryParams: Params = {};
    for (const param of this.queryParamsOrder) {
      if (queryParams[param]) {
        correctedQueryParams[param] = queryParams[param];
      }
    }
    return correctedQueryParams;
  }

  resetQueryParams(): void {
    this.queryParams = [];
  }
}
