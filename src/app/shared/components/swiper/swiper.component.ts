import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import SwiperCore, { Navigation } from 'swiper';
import { SwiperContentDirective } from '../../directives/swiper-template.directive';
import { MatIconModule } from '@angular/material/icon';
import { SharedVariablesService } from '../../services/shared-variables.service';
import { BehaviorSubject } from 'rxjs';
import { SwiperModule } from 'swiper/angular';
import { ApplicationStateService } from '../../services/application-state.service';

SwiperCore.use([Navigation]);
@Component({
  selector: 'keleman-swiper',
  standalone: true,
  imports: [CommonModule, MatIconModule, SwiperModule],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperComponent {
  @ContentChildren(SwiperContentDirective, {
    descendants: true,
  })
  contents!: QueryList<SwiperContentDirective>;

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

  constructor(
    public sharedVariablesService: SharedVariablesService,
    public applicationState: ApplicationStateService
  ) {}

  returnContent(slide: SwiperContentDirective): HTMLElement | null {
    return slide.template.elementRef.nativeElement;
  }
}
