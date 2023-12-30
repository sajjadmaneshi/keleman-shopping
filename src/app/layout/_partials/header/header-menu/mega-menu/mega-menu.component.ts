import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { ProductCategoryViewModel } from '../../../../../shared/data/models/view-models/product-category.view-model';

@Component({
  selector: 'keleman-mega-menu',
  templateUrl: './mega-menu.component.html',
})
export class MegaMenuComponent {
  iconNames = [
    'curtains',
    'horizontal_distribute',
    'door_sliding ',
    'cable ',
    'dashboard_customize',
    'room_preferences',
    'handyman',
    'handyman',
    'bolt ',
    'inventory',
    'memory',
    'dashboard_customize',
    'dashboard_customize',
  ];
  @ViewChild('megaMenu') megaMenu!: HTMLElement;
  activeIndex = 1;

  @Input() productCategories!: ProductCategoryViewModel[];
  @Output() clickItem = new EventEmitter<{
    c1?: string;
    c2?: string;
    c3?: string;
  }>();

  onHover(index: number) {
    this.activeIndex = index;
  }

  onClick(url: { c1?: string; c2?: string; c3?: string }) {
    this.clickItem.emit(url);
  }
}
