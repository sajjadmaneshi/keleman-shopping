import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SharedVariablesService {
  downloadUrl = ENVIRONMENT.downloadUrl;

  counter(count: number) {
    return new Array(count);
  }
}
