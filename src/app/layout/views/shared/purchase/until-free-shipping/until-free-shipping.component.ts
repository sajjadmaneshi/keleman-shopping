import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'keleman-until-free-shipping',
  templateUrl: './until-free-shipping.component.html',
  styleUrls: ['./until-free-shipping.component.scss'],
  imports: [DecimalPipe],
  standalone: true,
})
export class UntilFreeShippingComponent {}
