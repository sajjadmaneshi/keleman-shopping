import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import SwiperCore, { Navigation } from 'swiper';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SwiperContentDirective } from '../../directives/swiper-template.directive';
import { MatIconModule } from '@angular/material/icon';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { SharedVariablesService } from '../../services/shared-variables.service';
import { BehaviorSubject } from 'rxjs';
import { SwiperModule } from 'swiper/angular';

SwiperCore.use([Navigation]);
@Component({
  selector: 'standalone-swiper',
  standalone: true,
  imports: [
    CommonModule,

    InlineSVGModule,
    MatIconModule,
    NgxShimmerLoadingModule,
    SwiperModule,
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

  @Input('isLoading') isLoading$ = new BehaviorSubject(true);
  @Input() shimmerHeight = '300px';
  @Input() shimmerWidth = '250px';

  @Input() moreButtonText!: string;
  @Input() showMoreButton: boolean = true;
  @Input() showTitle: boolean = true;
  @Input() title!: string;
  @Input() titleBorder: boolean = true;
  @Input() navigation: boolean = true;
  @Input() slidesPerView: 'auto' | number = 'auto';
  @Input() spaceBetween?: number | undefined;

  @Input() navigationButtonClassPrefix!: string;

  constructor(public sharedVariablesService: SharedVariablesService) {}

  ngOnInit(): void {
    document.querySelectorAll('.swiper-slide').forEach((test) => {
      (test as HTMLElement).style.width = '250px';
    });
  }
}
