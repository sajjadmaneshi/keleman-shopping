import { Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'keleman-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent {
  isLoggedIn = false;
  constructor(private offcanvasService: NgbOffcanvas) {}
  openOffCanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
