import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazingOfferItemComponent } from './amazing-offer-item.component';

describe('AmazingOfferItemComponent', () => {
  let component: AmazingOfferItemComponent;
  let fixture: ComponentFixture<AmazingOfferItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazingOfferItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmazingOfferItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
