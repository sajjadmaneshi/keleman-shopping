import {Injectable} from "@angular/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BehaviorSubject} from "rxjs";
@Injectable({providedIn:"root"})
export class ResponsiveService {
   isMobile=new BehaviorSubject(false);

  constructor(private _responsive:BreakpointObserver) {}

 public mobileChange(){
    this._responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait]).subscribe((result)=>{
      result.matches?  this.isMobile.next(true):   this.isMobile.next(false);
    });

  }



}
