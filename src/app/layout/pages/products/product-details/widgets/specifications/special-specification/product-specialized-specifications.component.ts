import { Component } from '@angular/core';

@Component({
  selector: 'keleman-product-specialization',
  templateUrl: './product-specialized-specifications.component.html',
  styles: [
    `
      .product-checking {
        min-height: 100%;
        overflow: auto;
      }
      .details {
        margin: 0 15rem;
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
}
