import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-product-category-swiper',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnDestroy{
  $mobileView=new BehaviorSubject(false);
  subscriptions = new Subscription();
  constructor(private _responsive:BreakpointObserver) {
  }



  ngOnInit(): void {
  this._responseOnPageSize();
    }

  private _responseOnPageSize(){
    let responsive$ = this._responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .subscribe((result) => {
        result.matches?this.$mobileView.next(true):this.$mobileView.next(false);
      });
    this.subscriptions.add(responsive$);
  }

  ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
  }


}
