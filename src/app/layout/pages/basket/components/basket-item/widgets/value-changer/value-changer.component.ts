import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InlineSVGModule} from "ng-inline-svg-2";

@Component({
  selector: 'app-value-changer',
  templateUrl: './value-changer.component.html',
  standalone: true,
  imports: [
    InlineSVGModule
  ],
  styleUrls: ['./value-changer.component.scss']
})
export class ValueChangerComponent {
    @Input('initialValue') value:number=1;

    @Output('valueChange') change=new EventEmitter<number>();

    increase():void{
      this.value++;
      this.change.emit(this.value);
    }
    decrease():void{
      if(this.value>1)
      {
        this.value--;
        this.change.emit(this.value);
      }

    }

}
