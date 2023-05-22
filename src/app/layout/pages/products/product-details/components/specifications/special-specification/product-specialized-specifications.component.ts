import { Component } from '@angular/core';

@Component({
  selector: 'keleman-product-specialization',
  templateUrl: './product-specialized-specifications.component.html',
  styles: [
    `
      .product-details-check {
        width: 100%;
      }
      .product-checking {
        min-height: 100%;
        overflow: auto;
      }
      .details {
        margin: 0 auto;
        max-width: 900px;
      }
    `,
  ],
})
export class ProductSpecializedSpecificationsComponent {
  checkingList: any = [
    {
      title: 'مدل',
      value: 'الگو',
    },
    {
      title: 'مدل',
      value: 'الگو',
    },
    {
      title: 'مدل',
      value: 'الگو',
    },
    {
      title: 'مدل',
      value: 'الگو',
    },
    {
      title: 'مدل',
      value: 'الگو',
    },
    {
      title: 'مدل',
      value: 'الگو',
    },
    {
      title: 'مدل',
      value: 'الگو',
    },
  ];
  leftColumnData = this.checkingList.slice(
    0,
    Math.ceil(this.checkingList.length / 2)
  );
  rightColumnData = this.checkingList.slice(
    Math.ceil(this.checkingList.length / 2)
  );
}
