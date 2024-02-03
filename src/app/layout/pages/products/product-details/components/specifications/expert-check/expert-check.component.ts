import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'keleman-expert-check',
  templateUrl: './expert-check.component.html',
})
export class ExpertCheckComponent implements OnInit {
  expertCheck: string = '';

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService.productDescriptions
      .pipe(take(1))
      .subscribe((result) => (this.expertCheck = result.introduction));
  }
}
