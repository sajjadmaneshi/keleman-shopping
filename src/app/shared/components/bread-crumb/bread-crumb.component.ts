import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbTypeEnum } from '../../../home/data/bread-crumb-type.enum';
import { BreadCrumbViewModel } from '../../../home/data/view-models/bread-crumb.view-model';
import { Subscription, tap } from 'rxjs';
import { HomeRepository } from '../../../home/data/repositories/home.repository';
import { RouterLink } from '@angular/router';
import { Routing } from '../../../routing';

@Component({
  selector: 'keleman-bread-crumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnChanges, OnDestroy {
  isLoading = true;
  breadCrumbTypeEnum = BreadCrumbTypeEnum;

  breadCrumbItems: BreadCrumbViewModel[] = [];
  @Input() type!: BreadCrumbTypeEnum;
  @Input() id!: number;

  typeBreadCrumbs = [
    new TypeBreadCrumbs(
      BreadCrumbTypeEnum.Product,
      'محصولات',
      `/${Routing.products}/خرید-قطعات-آسانسور`
    ),
    new TypeBreadCrumbs(
      BreadCrumbTypeEnum.ProductCategory,
      'محصولات',
      `/${Routing.products}/خرید-قطعات-آسانسور`
    ),
    new TypeBreadCrumbs(
      BreadCrumbTypeEnum.Article,
      'مقالات',
      `/${Routing.magazine}`
    ),
    new TypeBreadCrumbs(
      BreadCrumbTypeEnum.ArticleCategory,
      'مقالات',
      `/${Routing.magazine}`
    ),
  ];

  levelTwoBreadCrumb!: TypeBreadCrumbs;

  subscription!: Subscription;

  constructor(private _homeRepository: HomeRepository) {}

  private _getBreadCrumbItems() {
    if (this.type != undefined) {
      this.levelTwoBreadCrumb = this.typeBreadCrumbs.find(
        (x) => x.type == this.type
      )!;
      if (this.id) {
        this.subscription = this._homeRepository
          .getBreadcrumb(this.type, this.id)
          .pipe(tap(() => (this.isLoading = false)))
          .subscribe((result) => {
            this.breadCrumbItems = result.result!;
          });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._getBreadCrumbItems();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
export class TypeBreadCrumbs {
  constructor(
    public type: BreadCrumbTypeEnum,
    public title: string,
    public route: string
  ) {}
}
