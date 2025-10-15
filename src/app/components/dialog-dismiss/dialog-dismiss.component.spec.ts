import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDismissComponent } from './dialog-dismiss.component';

describe('DialogDismissComponent', () => {
  let component: DialogDismissComponent;
  let fixture: ComponentFixture<DialogDismissComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDismissComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDismissComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
