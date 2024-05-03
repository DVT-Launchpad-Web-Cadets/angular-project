import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItenaryItemFormComponent } from './add-itenary-item-form.component';

describe('AddItenaryItemFormComponent', () => {
  let component: AddItenaryItemFormComponent;
  let fixture: ComponentFixture<AddItenaryItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItenaryItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddItenaryItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
