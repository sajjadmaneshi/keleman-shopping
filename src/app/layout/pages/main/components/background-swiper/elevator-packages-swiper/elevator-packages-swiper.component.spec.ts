import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorPackagesSwiperComponent } from './elevator-packages-swiper.component';

describe('ElevatorPackagesSwiperComponent', () => {
  let component: ElevatorPackagesSwiperComponent;
  let fixture: ComponentFixture<ElevatorPackagesSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevatorPackagesSwiperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevatorPackagesSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
