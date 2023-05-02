import { Component, OnInit, Renderer2 } from '@angular/core';

import { AsyncPipe, NgIf } from '@angular/common';
import { PurchaseMobileComponent } from '../../mobile/purchase-mobile/purchase-mobile.component';
import { PurchaseWebComponent } from '../../web/purchase-web/purchase-web.component';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { UntilFreeShippingComponent } from './until-free-shipping/until-free-shipping.component';

@Component({
  selector: 'keleman-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    PurchaseMobileComponent,
    PurchaseWebComponent,
    NgIf,
    UntilFreeShippingComponent,
  ],
})
export class PurchaseComponent implements OnInit {
  constructor(
    public applicationState: ApplicationStateService,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {}
}
