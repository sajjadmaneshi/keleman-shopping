import { Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);
@Component({
  selector: 'keleman-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductContentComponent {
  isFavorite = new BehaviorSubject(false);

  constructor(public applicationState: ApplicationStateService) {}
  addToFavorite() {
    this.isFavorite.next(true);
  }
  removeFromFavorite() {
    this.isFavorite.next(false);
  }
}
