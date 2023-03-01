import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'keleman-checkout-stepper',
  templateUrl: './checkout-stepper.component.html',
  styleUrls: ['./checkout-stepper.component.scss'],
})
export class CheckoutStepperComponent implements OnInit {
  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    public checkoutService: CheckoutService
  ) {}

  public passed(index: number): Observable<boolean> {
    return new BehaviorSubject(
      this.checkoutService.selectedIndex.value >= index
    );
  }

  ngOnInit(): void {
    this._activatedRoute.firstChild?.url.subscribe((routeSegment) => {
      this.checkoutService.determineSelectedIndex(routeSegment[0].path);
    });

    this.checkoutService.selectedIndex.subscribe((index) => {
      this.passed(index);
    });
  }
}
