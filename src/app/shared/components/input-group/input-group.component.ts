import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'keleman-input-group',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent implements ControlValueAccessor {
  @Input() placeHolder?: string;
  @Input() textAlign: 'right' | 'center' | 'left' = 'right';
  @Input() type: 'text' | 'number' | 'password' = 'text';
  onChange: any = () => {};
  onTouch: any = () => {};
  private _value = '';
  set value(val: string) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this._value = val;
    this.onChange(val);
    this.onTouch(val);
  }

  get value() {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    return this._value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }
}
