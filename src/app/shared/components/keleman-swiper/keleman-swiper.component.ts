import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { SuggestionSliderItemComponent } from '../../../layout/pages/magazine/components/list/suggestion/suggestion-slider-item/suggestion-slider-item.component';

import SwiperCore, { Navigation } from 'swiper';

import { InlineSVGModule } from 'ng-inline-svg-2';
import { ApplicationStateService } from '../../services/application-state.service';
import { SwiperContentDirective } from '../../directives/swiper-template.directive';
import { MatIconModule } from '@angular/material/icon';

SwiperCore.use([Navigation]);
@Component({
  selector: 'keleman-swiper',
  standalone: true,
  imports: [
    CommonModule,
    SwiperModule,
    SuggestionSliderItemComponent,
    InlineSVGModule,
    MatIconModule,
  ],
  templateUrl: './keleman-swiper.component.html',
  styleUrls: ['./keleman-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KelemanSwiperComponent implements OnInit {
  @ContentChildren(SwiperContentDirective, {
    descendants: true,
  })
  contents!: QueryList<SwiperContentDirective>;
  @Input() moreButtonText!: string;
  @Input() showMoreButton: boolean = true;
  @Input() showTitle: boolean = true;
  @Input() title!: string;
  @Input() titleBorder: boolean = true;
  @Input() navigation: boolean = true;
  @Input() slidesPerView: 'auto' | number = 'auto';
  @Input() spaceBetween?: number | undefined;

  @Input() navigationButtonClassPrefix!: string;

  constructor(public applicationStateService: ApplicationStateService) {}

  ngOnInit(): void {
    document.querySelectorAll('.swiper-slide').forEach((test) => {
      (test as HTMLElement).style.width = '250px';
    });
  }
}
