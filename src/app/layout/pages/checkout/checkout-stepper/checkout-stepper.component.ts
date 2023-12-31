import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'keleman-checkout-stepper',
  templateUrl: './checkout-stepper.component.html',
  styleUrls: ['./checkout-stepper.component.scss'],
})
export class CheckoutStepperComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    public checkoutService: CheckoutService
  ) {}

  public passed(index: number): Observable<boolean> {
    return new BehaviorSubject(
      this.checkoutService.selectedIndex.value >= index
    );
  }

  ngOnInit(): void {
    this.checkoutService.selectedIndex

      .pipe(takeUntil(this.destroy$))
      .subscribe((index) => {
        this.passed(index);
      });
    this._activatedRoute.firstChild
      ?.url!.pipe(takeUntil(this.destroy$))
      .subscribe((routeSegment) => {
        this.checkoutService.determineSelectedIndex(routeSegment[0].path);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
