import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductViewModel } from './models/product.view-model';

import { DataService } from '../../../../../../../shared/services/data.service';

@Injectable()
export class AmazingOfferRepository extends DataService<ProductViewModel> {
  constructor(_http: HttpClient) {
    super('products', _http);
  }
}
