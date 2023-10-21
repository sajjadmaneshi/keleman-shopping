import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApplicationStateService } from '../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @ViewChild('header', { static: true }) header!: ElementRef;
  constructor(public applicationState: ApplicationStateService) {}

  getHeader() {
    return this.header.nativeElement;
  }
}
