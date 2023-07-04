import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { ProductViewModel } from '../../../data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-product-relates',
  templateUrl: './product-relates.component.html',
  styleUrls: ['./product-relates.component.scss'],
})
export class ProductRelatesComponent {
  constructor(public applicationState: ApplicationStateService) {}
  products: ProductViewModel[] = [];
}
