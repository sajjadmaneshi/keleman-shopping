import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-page-latest-articles',
  templateUrl: './magazine.component.html',
})
export class MagazineComponent {
  isLoading = true;
  searchControl = new FormControl('');
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  updateQueryParams() {
    const queryParams = { q: this.searchControl.value };
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
