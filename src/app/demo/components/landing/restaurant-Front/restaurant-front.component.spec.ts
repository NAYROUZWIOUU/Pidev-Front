import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFrontComponent } from './restaurant-front.component';

describe('RestaurantFrontComponent', () => {
  let component: RestaurantFrontComponent;
  let fixture: ComponentFixture<RestaurantFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
