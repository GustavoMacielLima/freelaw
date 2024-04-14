import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowsNotFoundComponent } from './rows-not-found.component';

describe('RowsNotFoundComponent', () => {
  let component: RowsNotFoundComponent;
  let fixture: ComponentFixture<RowsNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowsNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowsNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
