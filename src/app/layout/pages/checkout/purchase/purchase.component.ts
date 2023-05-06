import { Component, OnInit, Renderer2 } from '@angular/core';

import { ApplicationStateService } from '../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  constructor(
    public applicationState: ApplicationStateService,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {}
}
