import {Component, OnInit} from '@angular/core';
import {ResponsiveService} from "../shared/services/responsive.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[ResponsiveService]
})
export class AppComponent implements OnInit{
  title = 'بازرگانی آسانسور کلمان';

  constructor(private _responsiveService:ResponsiveService) {

  }

  ngOnInit(): void {
  this._responsiveService.mobileChange();
  }


}
