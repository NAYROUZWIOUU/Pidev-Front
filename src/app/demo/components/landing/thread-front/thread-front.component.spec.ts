import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadFrontComponent } from './thread-front.component';

describe('ThreadFrontComponent', () => {
  let component: ThreadFrontComponent;
  let fixture: ComponentFixture<ThreadFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
