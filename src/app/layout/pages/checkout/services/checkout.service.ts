import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Routing } from '../../../../routing';

@Injectable()
export class CheckoutService {
  public selectedIndex = new BehaviorSubject<number>(0);
  baseUrl = Routing.checkout + '/';
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  changeStep(index: number, route: string) {
    this.selectedIndex.next(index);
    this._router.navigate([`${this.baseUrl}${route}`]).finally();
  }

  nextStep() {
    switch (this.selectedIndex.value) {
      case 0:
        this.changeStep(1, Routing.shipping);
        break;
      case 1:
        this.changeStep(2, Routing.payment);
        break;
    }
  }

  determineSelectedIndex(route: string) {
    switch (route) {
      case Routing.basket:
        this.selectedIndex.next(0);
        break;
      case Routing.shipping:
        this.selectedIndex.next(1);
        break;
      case Routing.payment:
        this.selectedIndex.next(2);
    }
  }
}
