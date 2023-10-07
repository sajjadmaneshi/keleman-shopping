import { Component, Input, OnInit } from '@angular/core';
import { ProductFilterService } from '../../../product-filter.service';
import { SelectableOption } from '../../../../../data/models/view-models/category-property-option.view-model';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'keleman-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss'],
})
export class FilterOptionComponent implements OnInit {
  @Input() propertyOption!: SelectableOption;

  constructor(
    public productFilterService: ProductFilterService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public determineSelectableArray() {
    if (this._isThisOptionInQueryList()) {
      this.productFilterService.determineSelectedArray(this.propertyOption);
    }
  }

  private _isThisOptionInQueryList() {
    return (
      Object.keys(this.productFilterService.queryParams).findIndex(
        (x) => x === (this.propertyOption.seoTitle ?? this.propertyOption.title)
      ) != -1
    );
  }

  ngOnInit(): void {
    this.determineSelectableArray();
  }
}
