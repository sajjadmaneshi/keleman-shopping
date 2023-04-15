import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ReadMoreContentDirective } from '../../directives/read-more-list-template.directive';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'keleman-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  imports: [NgTemplateOutlet, CommonModule],
  standalone: true,
})
export class ReadMoreComponent {
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
