import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'keleman-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.scss'],
})
export class ProductNavbarComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
