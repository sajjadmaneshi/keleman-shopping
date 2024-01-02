import { Component, OnDestroy } from '@angular/core';
import { ProfileRepository } from '../data/profile.repository';
import { FavoriteProductViewModel } from '../data/view-models/favorite-product.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { SharedVariablesService } from '../../../../shared/services/shared-variables.service';

@Component({
  selector: 'keleman-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnDestroy {
  isLoading = true;
  destroy$ = new Subject<void>();

  favoriteItems: FavoriteProductViewModel[] = [];
  constructor(
    private readonly _profileRepository: ProfileRepository,
    public sharedReferences: SharedVariablesService
  ) {
    this._getFavorites();
  }

  private _getFavorites() {
    this._profileRepository
      .getFavorites()
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.favoriteItems = [...result.result!];
      });
  }

  removeFromList(productId: number) {
    if (productId) {
      const productIndex = this.favoriteItems.findIndex(
        (x) => x.id == productId
      );
      if (productIndex != -1) this.favoriteItems.splice(productIndex, 1);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
