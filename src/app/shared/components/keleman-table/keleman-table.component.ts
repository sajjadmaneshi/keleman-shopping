import {
  Component,
  Input,
  OnInit,
  ɵRuntimeError as RuntimeError,
} from '@angular/core';
import { CommonModule, KeyValue, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'keleman-table',
  templateUrl: './keleman-table.component.html',
  styleUrls: ['./keleman-table.component.scss'],
  standalone: true,
  imports: [CommonModule, KeyValuePipe],
})
export class KelemanTableComponent implements OnInit {
  public onCompare(
    _left: KeyValue<any, any>,
    _right: KeyValue<any, any>
  ): number {
    return 1;
  }
  @Input() columns: string[] = [];
  @Input('rows') inputRows: any[] = [];

  rows: any[] = [];

  ngOnInit(): void {
    this.assertNotEqualColumnAndRowItems();
  }

  isEqualOfColumnAndRowItems() {
    let flag = true;
    if (this.inputRows.length > 0) {
      this.inputRows.forEach((item) => {
        const itemLength = Object.keys(item).length;
        if (itemLength != this.columns.length) {
          flag = false;
        }
      });
    }
    return flag;
  }
  assertNotEqualColumnAndRowItems() {
    if (!this.isEqualOfColumnAndRowItems()) {
      throw new RuntimeError(
        2000,
        `the number of column and row items isn't equal`
      );
    } else {
      this.rows = this.inputRows;
    }
  }
}
