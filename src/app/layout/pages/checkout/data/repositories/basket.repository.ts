import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { BasketItemViewModel } from '../models/basket-item.view-model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BasketRepository extends DataService<BasketItemViewModel> {
  constructor(_http: HttpClient) {
    super('basket', _http);
  }
}
