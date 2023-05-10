import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormFrontComponent } from './dorm-front.component';

describe('DormFrontComponent', () => {
  let component: DormFrontComponent;
  let fixture: ComponentFixture<DormFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormFrontComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DormFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
