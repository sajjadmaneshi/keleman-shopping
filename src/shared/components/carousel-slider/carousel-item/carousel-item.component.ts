import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveService } from '../../../services/responsive.service';
import { CarouselItemMobileComponent } from './device-views/carousel-item-mobile/carousel-item-mobile.component';
import { CarouselItemWebComponent } from './device-views/carousel-item-web/carousel-item-web.component';

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  imports: [
    CommonModule,
    CarouselItemMobileComponent,
    CarouselItemWebComponent,
  ],
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselItemComponent {
  constructor(public responsiveService: ResponsiveService) {}
}
