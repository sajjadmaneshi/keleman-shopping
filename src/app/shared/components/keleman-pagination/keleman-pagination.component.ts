import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedVariablesService } from '../../services/shared-variables.service';

@Component({
  selector: 'keleman-pagination',
  standalone: true,
  imports: [CommonModule, InlineSVGModule],
  templateUrl: './keleman-pagination.component.html',
  styleUrls: ['./keleman-pagination.component.scss'],
})
export class KelemanPaginationComponent implements OnInit {
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
