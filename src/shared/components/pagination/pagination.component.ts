import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedVariablesService } from '../../services/shared-variables.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, InlineSVGModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalElement!: number;
  @Input() page: number = 0;
  @Input() limit: number = 5;

  @Output() pageChange = new EventEmitter<number>();
  @Output() previous = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();

  pageCount: number = 0;

  constructor(public sharedVariablesService: SharedVariablesService) {}

  private _calculatePageCount() {
    return Math.ceil(this.totalElement / this.limit);
  }

  ngOnInit(): void {
    this.pageCount = this._calculatePageCount();
    console.log(this.pageCount);
  }

  onChange(page: number) {
    this.page = page;
    this.pageChange.emit(page);
  }

  onPrevious() {
    if (this.page > 0) {
      this.page--;
      this.previous.emit(this.page);
    }
  }
  onNext() {
    if (this.page < this.pageCount - 1) {
      this.page++;
      this.next.emit(this.page);
    }
  }
}
