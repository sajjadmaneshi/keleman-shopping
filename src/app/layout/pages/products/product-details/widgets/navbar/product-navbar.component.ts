import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.scss'],
})
export class ProductNavbarComponent {
  constructor(public applicationState: ApplicationStateService) {}
}