import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ProductFilterService } from '../../../../product-filter.service';
import { SelectablePropertyModel } from '../../../../../../data/models/view-models/category-property-option.view-model';
import { ActivatedRoute, Params } from '@angular/router';
import { SelectedFilterModel } from '../../../data/selected-filter.model';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'keleman-filter-items',
  templateUrl: './filter-items.component.html',
  styleUrls: ['../../filter-items.scss'],
})
export class FilterItemsComponent implements OnInit, OnDestroy {
  @Input() optionTitle!: string;
  @Input() initialProperties: SelectablePropertyModel[] = [];

  @Output() selectionChange = new EventEmitter<any>();

  destroy$ = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    public productFilterService: ProductFilterService
  ) {}

  ngOnInit(): void {
    if (this.initialProperties) {
      this._activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
        this.productFilterService.determineSelectedArray(
          params,
          this.initialProperties,
          this.optionTitle
        );
      });
    }
  }

  changeSelection(property: SelectablePropertyModel) {
    this.selectionChange.emit(property);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
