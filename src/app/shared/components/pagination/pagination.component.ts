import {
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
export class PaginationComponent {
  private _currentPage: number = 1;
  private _limit = 10;
  private _totalElements!: number;

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

  @Input() set totalElements(totalElements: number) {
    this._totalElements = totalElements;
  }

  @Output() pageChange = new EventEmitter<number>();

  constructor(
    private _el: ElementRef,
    public sharedVariables: SharedVariablesService
  ) {}

  onPrevious() {
    let page = this.currentPage;
    if (page > 1) page--;
    this.onPageChange(page);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;

    window.scroll(0, 0);
    this.pageChange.emit(this.currentPage);
  }
}
