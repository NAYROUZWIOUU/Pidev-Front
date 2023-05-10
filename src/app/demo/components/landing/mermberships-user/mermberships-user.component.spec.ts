import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MermbershipsUserComponent } from './mermberships-user.component';

describe('MermbershipsUserComponent', () => {
  let component: MermbershipsUserComponent;
  let fixture: ComponentFixture<MermbershipsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MermbershipsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MermbershipsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
