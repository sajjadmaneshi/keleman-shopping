import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAmountCardComponent } from './wallet-amount-card.component';

describe('WalletAmountCardComponent', () => {
  let component: WalletAmountCardComponent;
  let fixture: ComponentFixture<WalletAmountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletAmountCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletAmountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
