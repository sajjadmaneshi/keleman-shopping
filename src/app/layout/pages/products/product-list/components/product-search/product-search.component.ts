import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Routing } from '../../../../../../routing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'keleman-product-search',

  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnChanges {
  destroy$ = new Subject<void>();

  @Input() initialSearchText = '';

  searchText = new FormControl('');

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  navigateToProduct() {
    let queryParams = { q: this.searchText.value, p: '0' };
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchText.patchValue(this.initialSearchText);
  }
}
