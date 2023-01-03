import { Component, ContentChildren, Input, QueryList } from '@angular/core';

import { ReadMoreContentDirective } from '../../directives/read-more-list-template.directive';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'keleman-read-more',
  templateUrl: './keleman-read-more.component.html',
  styleUrls: ['./keleman-read-more.component.scss'],
  imports: [NgTemplateOutlet, CommonModule],
  standalone: true,
})
export class KelemanReadMoreComponent {
  @Input() title?: string;
  @Input() limit: number = 4;

  @ContentChildren(ReadMoreContentDirective, {
    descendants: true,
  })
  contents!: QueryList<ReadMoreContentDirective>;

  showMore = false;

  toggleShow() {
    this.showMore = !this.showMore;
  }
}
