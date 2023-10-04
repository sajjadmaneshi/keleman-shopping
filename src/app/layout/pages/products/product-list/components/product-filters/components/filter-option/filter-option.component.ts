import { Component, Input, OnInit } from '@angular/core';
import { ProductFilterService } from '../../../product-filter.service';
import { SelectableOption } from '../../../../../data/models/view-models/category-property-option.view-model';

@Component({
  selector: 'keleman-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss'],
})
export class FilterOptionComponent {
  @Input() option!: SelectableOption;

  constructor(public productFilterService: ProductFilterService) {}
}
