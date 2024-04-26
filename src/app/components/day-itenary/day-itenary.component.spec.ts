import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayItenaryComponent } from './day-itenary.component';

describe('DayItenaryComponent', () => {
  let component: DayItenaryComponent;
  let fixture: ComponentFixture<DayItenaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayItenaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayItenaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
