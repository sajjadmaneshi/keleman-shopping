import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazingOfferSwiperComponent } from './amazing-offer-swiper.component';

describe('AmazingOfferSwiperComponent', () => {
  let component: AmazingOfferSwiperComponent;
  let fixture: ComponentFixture<AmazingOfferSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazingOfferSwiperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmazingOfferSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
