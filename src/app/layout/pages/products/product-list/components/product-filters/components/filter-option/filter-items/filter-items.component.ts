import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ProductFilterService } from '../../../../../../services/product-filter.service';
import {
  OptionViewModel,
  SelectablePropertyModel,
} from '../../../../../../data/models/view-models/category-property-option.view-model';
import { ActivatedRoute, Params } from '@angular/router';
import { SelectedFilterModel } from '../../../data/selected-filter.model';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'keleman-filter-items',
  templateUrl: './filter-items.component.html',
})
export class FilterItemsComponent implements OnDestroy {
  @Input() initialProperties: SelectablePropertyModel[] = [];

  @Output() selectionChange = new EventEmitter<any>();

  destroy$ = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    public productFilterService: ProductFilterService
  ) {}

  changeSelection(property: SelectablePropertyModel) {
    property.selected = true;
    this.selectionChange.emit(property);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
