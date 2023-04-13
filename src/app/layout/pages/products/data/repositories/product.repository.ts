import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../../shared/services/data.service';
import { ProductViewModel } from '../models/view-models/product.view-model';

@Injectable()
export class ProductRepository extends DataService<ProductViewModel> {
  constructor(_http: HttpClient) {
    super('products', _http);
  }
}
