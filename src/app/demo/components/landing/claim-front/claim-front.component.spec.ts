import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFrontComponent } from './claim-front.component';

describe('ClaimFrontComponent', () => {
  let component: ClaimFrontComponent;
  let fixture: ComponentFixture<ClaimFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
