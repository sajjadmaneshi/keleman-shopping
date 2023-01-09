import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'keleman-off-canvas-menu',
  templateUrl: './off-canvas-menu.component.html',
  styleUrls: ['./off-canvas-menu.component.scss'],
})
export class OffCanvasMenuComponent {
  @Output() close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
