import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutoCompleteComponent } from '../../../../../../shared/components/auto-complete/auto-complete.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductOptionViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { OptionPriceDto } from '../../../data/models/dto/option-price.dto';

@Component({
  selector: 'keleman-property-options',
  standalone: true,
  imports: [AutoCompleteComponent, ReactiveFormsModule],
  templateUrl: './property-options.component.html',
  styleUrl: './property-options.component.scss',
})
export class PropertyOptionsComponent implements OnInit {
  @Input() propertyOptions: ProductOptionViewModel[] = [];
  @Output() change = new EventEmitter<OptionPriceDto[]>();

  propertyOptionForm!: FormGroup;
  selectedOptions: OptionPriceDto[] = [];

  constructor(private fb: FormBuilder) {
    this.propertyOptionForm = this.fb.group({});
  }

  ngOnInit(): void {
    if (this.propertyOptions) {
      this._initialSelectedPropertyOptions();
    }
  }

  formControlDetector(index: number): FormControl {
    return this.propertyOptionForm.controls[`option${index}`] as FormControl;
  }

  private _initialSelectedPropertyOptions() {
    this.propertyOptions.forEach((option, index) => {
      this.selectedOptions.push({
        optionId: option.id,
        valueId: option.options[0].id!,
      });
      const controlName = `option${index + 1}`;
      const control = new FormControl(
        option.options[0].title,
        Validators.required
      ) as FormControl;
      this.propertyOptionForm.addControl(controlName, control);
    });
    this.change.emit(this.selectedOptions);
  }

  changeOptions(valueId: number, optionId: number) {
    const seletedOption = this.selectedOptions.find(
      (x) => x.optionId === optionId
    )!;
    seletedOption.valueId = valueId;
    this.change.emit(this.selectedOptions);
  }
}
