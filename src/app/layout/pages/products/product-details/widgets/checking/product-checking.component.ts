import { Component } from '@angular/core';

@Component({
  selector: 'keleman-product-checking',
  templateUrl: './product-checking.component.html',
  styles: [
    `
      .product-checking {
        min-height: 100%;
        overflow: auto;
      }
    `,
  ],
})
export class ProductCheckingComponent {
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
