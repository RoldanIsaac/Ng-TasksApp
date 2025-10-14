import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TasksTableComponent } from '../../components/tasks-table/tasks-table.component';
import { EntityUI } from '../../../../core/interfaces/ui';
import { Task } from '../../store/tasks.models';
import { TasksAddEditComponent } from '../../components/tasks-add-edit/tasks-add-edit.component';
import { TasksDetailsComponent } from '../tasks-details/tasks-details.component';
import { Subject, take, takeUntil } from 'rxjs';
import { TasksState } from '../../store/tasks.reducer';
import { DialogService } from '../../../../services/dialog.service';
import { select, Store } from '@ngrx/store';
import { createTask, deleteTask, loadTasks } from '../../store/tasks.actions';
import { selectAllTasks } from '../../store/tasks.selectors';
import { tasksCols } from '../../components/tasks-table/tasks-table.config';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, TasksTableComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  tasksUI: EntityUI = {
    name: 'Tasks',
    data: signal<Task[]>([]),
    dialogs: {
      addEdit: TasksAddEditComponent,
      details: TasksDetailsComponent,
    },
  };

  constructor(
    private store: Store<TasksState>,
    private _dialogService: DialogService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   *
   */
  ngOnInit(): void {
    this.getAllFromStore();
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   *
   */
  getAllFromStore(): void {
    // Get All Users | Action & Selector
    this.store.dispatch(loadTasks());
    this.store
      .pipe(takeUntil(this._unsubscribeAll), select(selectAllTasks))
      .subscribe((users) => {
        if (!users) {
          return;
        }
        this.tasksUI.data.set([...users]);
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ DialogService Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   *
   */
  onDetails(data: any) {
    this._dialogService.openModal(this.tasksUI.dialogs.details, data, false);
  }

  /**
   *
   */
  onCreate() {
    this._dialogService
      .openModal(this.tasksUI.dialogs.addEdit)
      .pipe(take(1))
      .subscribe((formData: FormData) => {
        if (formData) {
          // console.log(formData);
          this.store.dispatch(createTask({ taskData: formData }));
        }
      });
  }

  onUpdate(data: any): void {}

  /**
   *
   */
  onDelete(data: any): void {
    // const dialogData: FuseConfirmationConfig = {
    //   title: 'Confirm delete user',
    //   message: `Are you sure to delete this user permanently: ${task.title}?`,
    //   dismissible: true,
    // };
    // this._confirmationService
    //   .open(dialogData)
    //   .afterClosed()
    //   .subscribe((res) => {
    //     if (res !== 'confirmed') return;
    //     this.store.dispatch(deleteTask({ id: task.id }));
    //   });
  }
}
