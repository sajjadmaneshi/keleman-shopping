import { Component } from '@angular/core';
import { AmazingOfferRepository } from './data/amazing-offer.repository';
import { ProductViewModel } from '../../../../products/data/models/view-models/product.view-model';
import { BehaviorSubject } from 'rxjs';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
@Component({
  selector: 'app-amazing-offer-swiper',
  templateUrl: './amazing-offer-swiper.component.html',
  styleUrls: ['./amazing-offer-swiper.component.scss'],
  providers: [AmazingOfferRepository],
})
export class AmazingOfferSwiperComponent {
  isLoading = new BehaviorSubject(false);
  slides: ProductViewModel[] = [];
  constructor(public sahredVariableService: SharedVariablesService) {}
}
