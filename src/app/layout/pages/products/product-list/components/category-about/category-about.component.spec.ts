import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAboutComponent } from './category-about.component';

describe('CategoryAboutComponent', () => {
  let component: CategoryAboutComponent;
  let fixture: ComponentFixture<CategoryAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
