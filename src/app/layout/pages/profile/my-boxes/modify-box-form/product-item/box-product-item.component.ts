import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'keleman-box-product-item',
  templateUrl: './box-product-item.component.html',
  styleUrls: ['./box-product-item.component.scss']
})
export class BoxProductItemComponent {
@Input() productDetails:any;
@Output() onMove=new EventEmitter<any>();

  onMoveChange() {
    this.onMove.emit(this.productDetails)
  }
}
