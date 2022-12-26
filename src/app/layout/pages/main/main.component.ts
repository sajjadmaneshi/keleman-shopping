import { Component } from '@angular/core';
import {SharedVariablesService} from "../../../../shared/services/shared-variables.service";
import SwiperCore, {Autoplay} from "swiper";

SwiperCore.use([Autoplay]);
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
constructor(public shareVariableService:SharedVariablesService) {
}
}
