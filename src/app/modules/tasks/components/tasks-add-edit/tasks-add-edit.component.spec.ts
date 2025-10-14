import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAddEditComponent } from './tasks-add-edit.component';

describe('TasksAddEditComponent', () => {
  let component: TasksAddEditComponent;
  let fixture: ComponentFixture<TasksAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
