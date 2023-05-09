import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormfrontComponent } from './dormfront.component';

describe('DormfrontComponent', () => {
  let component: DormfrontComponent;
  let fixture: ComponentFixture<DormfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
