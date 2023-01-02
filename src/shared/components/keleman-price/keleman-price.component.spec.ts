import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelemanPriceComponent } from './keleman-price.component';

describe('KelemanPriceComponent', () => {
  let component: KelemanPriceComponent;
  let fixture: ComponentFixture<KelemanPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KelemanPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KelemanPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
