import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'keleman-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
})
export class ReceiptFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() number: number = 1;

  @Output('remove') onRemove = new EventEmitter<number>();

  remove() {
    this.onRemove.emit(this.number);
  }

  public get amount(): FormControl {
    return (this.formGroup.get('receipts') as FormArray)
      .controls[0] as FormControl;
  }
  public get from(): FormControl {
    return (this.formGroup.get('receipts') as FormArray)
      .controls[1] as FormControl;
  }
  public get to(): FormControl {
    return (this.formGroup.get('receipts') as FormArray)
      .controls[2] as FormControl;
  }
  public get trackingCode(): FormControl {
    return (this.formGroup.get('receipts') as FormArray)
      .controls[3] as FormControl;
  }

  constructor() {}
}
