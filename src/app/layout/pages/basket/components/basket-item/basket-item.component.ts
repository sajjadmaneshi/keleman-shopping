import { Component} from '@angular/core';

import {ResponsiveService} from "../../../../../../shared/services/responsive.service";


@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent {
constructor(public responsiveService:ResponsiveService) {
}
}
