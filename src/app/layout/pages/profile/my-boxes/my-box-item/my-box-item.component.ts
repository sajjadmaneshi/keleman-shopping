import {Component, Input} from '@angular/core';

@Component({
  selector: 'keleman-my-box-item',
  templateUrl: './my-box-item.component.html',
  styleUrls: ['./my-box-item.component.scss']
})
export class MyBoxItemComponent {
  @Input() data: any;
}
