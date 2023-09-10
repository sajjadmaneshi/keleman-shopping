import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'keleman-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  imports: [CommonModule, MatAutocompleteModule, MatProgressSpinnerModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
  ],
})
export class AutoCompleteComponent implements ControlValueAccessor, OnChanges {
  @Input() options: any[] = [];
  @Input() isInavlid: boolean = false;

  @Input() label!: string;

  @Input() placeHolder!: string;
  @Input() disabled: boolean = false;

  @Input() isLoading: boolean = false;

  @Output() onSelectionChange = new EventEmitter<any>();

  filteredOptions$!: Observable<any[]>;
  value!: string;

  private _searchSubject = new BehaviorSubject<string>('');

  private _onChange!: (_: any) => void;
  private _onTouched!: (_: any) => void;

  valueChange(value: string) {
    this._searchSubject.next(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && changes['options'].currentValue.length > 0) {
      this.filteredOptions$ = this._searchSubject.pipe(
        startWith(''),
        map((item) => (item ? this._filterStates(item) : this.options.slice()))
      );
    }
  }
  private _filterStates(value: string): any[] {
    let newValue = value;
    if (value.includes('ی')) {
      newValue = value.replace('ی', 'ي');
    }
    const filterValue = newValue.toLowerCase();

    return this.options.filter((item: any) =>
      item['title'].toLowerCase().includes(filterValue)
    );
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void): void {
    this._onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  displayFn(option: any): string {
    return option && option.title ? option.title : '';
  }

  selected($event: MatAutocompleteSelectedEvent) {
    this.value = $event.option.value.title; // Update the value property with the selected option's title
    this._onChange(this.value);
    this.onSelectionChange.emit($event.option.value.id);
  }
}
