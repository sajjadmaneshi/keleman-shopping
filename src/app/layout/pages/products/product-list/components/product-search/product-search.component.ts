import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Routing } from '../../../../../../routing';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'keleman-product-search',

  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent {
  destroy$ = new Subject<void>();

  searchText = new FormControl('');

  constructor(private _router: Router) {}

  navigateToProduct() {
    this._router.navigate([Routing.products], {
      queryParams: { q: this.searchText.value, p: '0' },
    });
  }
}
