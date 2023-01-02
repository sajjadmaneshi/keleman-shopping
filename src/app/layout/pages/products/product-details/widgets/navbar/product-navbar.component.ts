import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ApplicationStateService } from '../../../../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.scss'],
})
export class ProductNavbarComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
