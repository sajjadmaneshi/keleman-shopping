import { Component } from '@angular/core';
import { ApplicationStateService } from '../shared/services/application-state.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(public applicationState: ApplicationStateService) {}
}
