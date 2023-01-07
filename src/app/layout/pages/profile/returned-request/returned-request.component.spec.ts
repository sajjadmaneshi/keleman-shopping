import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedRequestComponent } from './returned-request.component';

describe('ReturenedRequestComponent', () => {
  let component: ReturnedRequestComponent;
  let fixture: ComponentFixture<ReturnedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnedRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
