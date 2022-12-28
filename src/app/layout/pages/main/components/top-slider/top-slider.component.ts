import { Component } from '@angular/core';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';

@Component({
  selector: 'app-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.scss'],
})
export class TopSliderComponent {
  constructor(public sharedVariableService: SharedVariablesService) {}
}
