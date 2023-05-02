import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'keleman-selected-product-box',
  templateUrl: './selected-product-box.component.html',
  styleUrls: ['./selected-product-box.component.scss']
})
export class SelectedProductBoxComponent {
  @Input() productDetails:any;
  @Output() remove=new EventEmitter<number>()

  removeChange() {
    this.remove.emit(this.productDetails.id)
  }
}
