import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'keleman-autocomplete',
  templateUrl: './keleman-autocomplete.component.html',
  styleUrls: ['./keleman-autocomplete.component.scss'],
  imports: [CommonModule, MatAutocompleteModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KelemanAutocompleteComponent),
      multi: true,
    },
  ],
})
export class KelemanAutocompleteComponent
  implements ControlValueAccessor, OnInit
{
  @Input() options: any[] = [];

  @Input() label!: string;

  @Input() placeHolder!: string;
  filteredOptions!: Observable<any[]>;
  value!: string;

  private _searchSubject = new BehaviorSubject<string>('');

  private _onChange!: (_: any) => void;
  private _onTouched!: (_: any) => void;

  valueChange(value: string) {
    this._searchSubject.next(value);
  }
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((item: any) =>
      item['name'].toLowerCase().includes(filterValue)
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

  ngOnInit(): void {
    this.filteredOptions = this._searchSubject.pipe(
      startWith(''),
      map((item) => (item ? this._filterStates(item) : this.options.slice()))
    );
  }
}
