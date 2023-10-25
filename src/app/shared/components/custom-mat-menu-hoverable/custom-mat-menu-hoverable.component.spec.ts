import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatMenuHoverableComponent } from './custom-mat-menu-hoverable.component';

describe('CustomMatMenuHoverableComponent', () => {
  let component: CustomMatMenuHoverableComponent;
  let fixture: ComponentFixture<CustomMatMenuHoverableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CustomMatMenuHoverableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatMenuHoverableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
