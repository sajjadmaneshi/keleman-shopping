import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbTypeEnum } from '../../../home/data/repositories/bread-crumb-type.enum';
import { BreadCrumbViewModel } from '../../../home/data/repositories/view-models/bread-crumb.view-model';
import { Subscription, tap } from 'rxjs';
import { HomeRepository } from '../../../home/data/repositories/home.repository';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'keleman-bread-crumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit {
  isLoading = true;

  breadCrumbItems: BreadCrumbViewModel[] = [];
  @Input() type!: BreadCrumbTypeEnum;
  @Input() id!: number;

  subscription!: Subscription;

  constructor(private _homeRepository: HomeRepository) {}

  ngOnInit(): void {
    if (this.type && this.id)
      this.breadCrumbItems = [
        { title: 'خانه', url: '/', level: 0 },
        { title: 'محصولات', url: '/', level: 2 },
        { title: 'محصول1', url: '/', level: 3 },
      ];
  }

  private _getBreadCrumbItems() {
    this.subscription = this._homeRepository
      .getBreadcrumb(this.type, this.id)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.breadCrumbItems = result.result!;
      });
  }
}
