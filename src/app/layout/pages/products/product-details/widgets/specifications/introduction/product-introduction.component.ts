import { Component } from '@angular/core';

@Component({
  selector: 'keleman-product-introduction',
  templateUrl: './product-introduction.component.html',
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
export class ProductIntroductionComponent {}
