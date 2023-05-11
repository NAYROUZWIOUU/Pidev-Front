import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmembershipComponent } from './fmembership.component';

describe('FmembershipComponent', () => {
  let component: FmembershipComponent;
  let fixture: ComponentFixture<FmembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
