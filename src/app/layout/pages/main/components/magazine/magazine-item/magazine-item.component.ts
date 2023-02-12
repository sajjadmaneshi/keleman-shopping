import { Component, Input } from '@angular/core';

@Component({
  selector: 'keleman-magazine-item',
  templateUrl: './magazine-item.component.html',
  styleUrls: ['./magazine-item.component.scss'],
})
export class MagazineItemComponent {
  @Input() isNew = false;
  @Input() date!: string;
}
