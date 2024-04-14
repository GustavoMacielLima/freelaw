import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigationFormModalComponent } from './litigation-form-modal.component';

describe('LitigationFormModalComponent', () => {
  let component: LitigationFormModalComponent;
  let fixture: ComponentFixture<LitigationFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitigationFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitigationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
