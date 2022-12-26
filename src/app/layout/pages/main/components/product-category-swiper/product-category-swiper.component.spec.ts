import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorySwiperComponent } from './product-category-swiper.component';

describe('ProductCategorySwiperComponent', () => {
  let component: ProductCategorySwiperComponent;
  let fixture: ComponentFixture<ProductCategorySwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategorySwiperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategorySwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
