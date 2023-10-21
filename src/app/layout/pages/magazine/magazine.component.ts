import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamGeneratorService } from '../../../shared/services/query-params-generator.service';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
})
export class MagazineComponent {
  isLoading = true;
  searchControl = new FormControl('');
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _queryParamService: QueryParamGeneratorService
  ) {
    this._queryParamService.fixQueryParamsOrderInUrl();
  }

  updateQueryParams() {
    const queryParams = { q: this.searchControl.value };
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
