import { Component, HostListener } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  constructor(public applicationState: ApplicationStateService) {}
  @HostListener('mousewheel', ['$event'])
  onScroll() {
    const productDetailsNavbar = document.querySelector(
      '.product-details-navbar'
    )!;

    (productDetailsNavbar as HTMLElement).offsetTop > 700
      ? productDetailsNavbar.classList.add('add-shadow')
      : productDetailsNavbar.classList.remove('add-shadow');
  }
}
