import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestFavoritesComponent } from './latest-favorites.component';

describe('LatestFavoritesComponent', () => {
  let component: LatestFavoritesComponent;
  let fixture: ComponentFixture<LatestFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
