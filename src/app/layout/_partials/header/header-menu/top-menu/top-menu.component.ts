import { Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'keleman-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent {
  constructor(private offcanvasService: NgbOffcanvas) {}
  openOffCanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
