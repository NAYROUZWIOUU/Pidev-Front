import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelitycarduserComponent } from './fidelitycarduser.component';

describe('FidelitycarduserComponent', () => {
  let component: FidelitycarduserComponent;
  let fixture: ComponentFixture<FidelitycarduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FidelitycarduserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidelitycarduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
