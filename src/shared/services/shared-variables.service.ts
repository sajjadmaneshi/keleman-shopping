import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedVariablesService {
  constructor() {}

  counter(count: number) {
    return new Array(count);
  }
}
