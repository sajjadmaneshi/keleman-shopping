import {AfterViewInit, Component} from '@angular/core';

import {SharedVariablesService} from "../../../../../../../shared/services/shared-variables.service";
import SwiperCore, {Pagination, SwiperOptions} from "swiper";


SwiperCore.use([Pagination])
@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {

swiperConfig:SwiperOptions={
  pagination:{clickable:true},
  spaceBetween:15,
  slidesPerView:4
}

 constructor(public sharedVariables:SharedVariablesService) {
 }




}
