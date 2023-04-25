import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmembershipComponent } from './rmembership.component';

describe('RmembershipComponent', () => {
  let component: RmembershipComponent;
  let fixture: ComponentFixture<RmembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
