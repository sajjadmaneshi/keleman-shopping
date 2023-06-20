import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedVariablesService } from '../../services/shared-variables.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'keleman-pagination',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgbPagination],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements AfterViewInit {
  private _currentPage: number = 1;
  private _limit = 10;
  private _totalElements!: number;
  private _pageToShow = 0;
  private _pageCount = 0;
  private _hastCustomPrev = false;
  private _hasCustomNext = false;

  get currentPage(): number {
    return this._currentPage;
  }
  @Input() set currentPage(page: number) {
    this._currentPage = page;
  }

  get limit(): number {
    return this._limit;
  }
  @Input() set limit(limit: number) {
    this._limit = limit;
  }
  get totalElements(): number {
    return this._totalElements;
  }

  get pageCount(): number {
    return this._pageCount;
  }

  set pageCount(value: number) {
    this._pageCount = value;
  }
  @Input() set totalElements(totalElements: number) {
    this._totalElements = totalElements;
  }

  get pageToShow(): number {
    if (this.totalElements > 3 * this.limit) {
      this.pageToShow = 3;
    } else {
      this.pageToShow;
    }
    return this._validatePageToShow()
      ? this._pageToShow
      : this.pageCount > 0
      ? this.pageCount - 1
      : 1;
  }
  set pageToShow(page: number) {
    this._pageToShow = page;
  }

  @Output() pageChange = new EventEmitter<number>();

  get hasCustomNext(): boolean {
    return this._hasCustomNext;
  }

  set hasCustomNext(value: boolean) {
    this._hasCustomNext = value;
  }
  get hastCustomPrev(): boolean {
    return this._hastCustomPrev;
  }

  set hastCustomPrev(value: boolean) {
    this._hastCustomPrev = value;
  }

  constructor(
    private _el: ElementRef,
    public sharedVariables: SharedVariablesService
  ) {}

  private _validatePageToShow() {
    return this._pageToShow < this.pageCount;
  }

  onPrevious() {
    let page = this.currentPage;
    if (page > 1) page--;
    this.onPageChange(page);
  }
  onNext() {
    let page = this.currentPage;
    if (page < this.pageCount) page++;
    this.onPageChange(page);
  }

  onPageChange(pageNumber: number) {
    if (pageNumber <= this.pageCount) {
      this.currentPage = pageNumber;
    }
    window.scroll(0, 0);
    this.pageChange.emit(this.currentPage);
  }

  pageNumbers(num: number) {
    let array: number[] = [];
    if (this.totalElements > this.limit) {
      if (this.totalElements >= this.limit * 3) {
        this.pageToShow = 3;
      } else {
        this.pageToShow = 2;
      }
    } else this.pageToShow = 1;
    for (let i = 1; i <= this.pageToShow; i++) {
      array.push(i);
    }

    // if (
    //   num < this.pageToShow &&
    //   this.totalElements >= this.pageToShow * this.limit
    // ) {
    //   for (let i = 1; i <= this.pageToShow; i++) {
    //     array.push(i);
    //   }
    // }
    // debugger;
    // const pageCounts = this.totalElements / this.limit + 1;
    // for (let i = array[-1]; i <= pageCounts; i++) {
    //   array.push(i);
    // }
    //
    // // if (num === this.pageToShow) {
    // //   for (let i = 1; i <= num + 1; i++) {
    // //     array.push(i);
    // //   }
    // // }
    // // if (num > this.pageToShow && num < this.pageCount) {
    // //   array = [num - 1, num, num + 1];
    // // }
    // // if (num === this.pageCount) {
    // //   array = [num - 1, num];
    // // }
    return array;
  }

  ngAfterViewInit(): void {
    console.log(this.totalElements);
    this.pageCount = Math.ceil(this.totalElements / this.limit);
    this.hastCustomPrev =
      !!this._el.nativeElement.querySelector("[slot='previous']");
    this.hasCustomNext =
      !!this._el.nativeElement.querySelector("[slot='next']");
  }
}
