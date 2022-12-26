import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {
  mobileView$ = new BehaviorSubject<boolean>(false);
  subscriptions = new Subscription();

  constructor(private _responsive: BreakpointObserver, private _renderer: Renderer2) {
  }


  ngOnInit(): void {
    this._responseOnPageSizeChange();
  }

  private _responseOnPageSizeChange() {
    let kelemanBasket = document.querySelector('.klm-basket') as HTMLElement
    let responsive$ = this._responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .subscribe((result) => {

        if (result.matches) {
          this.mobileView$.next(true)
          this._renderer.setStyle(kelemanBasket, 'margin-bottom', '70px')
        } else {
          this._renderer.removeStyle(kelemanBasket, 'margin-bottom',)
          this.mobileView$.next(false)
        }

      });
    this.subscriptions.add(responsive$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
