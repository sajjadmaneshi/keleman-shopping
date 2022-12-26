import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryItemComponent } from './product-category-item.component';

describe('ProductCategoryItemComponent', () => {
  let component: ProductCategoryItemComponent;
  let fixture: ComponentFixture<ProductCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
