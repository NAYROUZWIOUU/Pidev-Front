import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockfoyerComponent } from './blockfoyer.component';

describe('BlockfoyerComponent', () => {
  let component: BlockfoyerComponent;
  let fixture: ComponentFixture<BlockfoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockfoyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockfoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
