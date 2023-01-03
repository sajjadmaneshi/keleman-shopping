import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-product-category',
  templateUrl: './keleman-product-category.component.html',
})
export class KelemanProductCategoryComponent {
  constructor(public applicationStateService: ApplicationStateService) {}
}
