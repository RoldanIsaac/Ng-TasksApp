import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import * as TaskActions from './tasks.actions';

@Injectable()
export class TasksEffects {
  private _actions$ = inject(Actions);
  private _store = inject(Store);
  private _taskService = inject(TasksService);

  messages = {
    getAllError: 'Error getting all tasks',
    connectionError: 'Error connecting to the server',
    unknownError: 'Unknown error',
  };

  // ------------------------------------------------------------------------------------------
  // @ Effects
  // ------------------------------------------------------------------------------------------

  // Get All Tasks
  getAllTasks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() => {
        return this._taskService.getAll().pipe(
          map((res) => {
            return TaskActions.loadTasksSuccess({
              tasks: res,
            });
          }),
          catchError((error) =>
            of(
              TaskActions.loadTasksFailure({
                error: error?.error?.message || this.messages.unknownError,
              })
            )
          )
        );
      })
    )
  );

  // Get One Task
  getTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.loadTask),
      switchMap((action) => {
        return this._taskService.getOne(action.id).pipe(
          map((res) => {
            return TaskActions.loadTaskSuccess({
              task: res,
            });
          }),
          catchError((error) =>
            of(
              TaskActions.loadTaskFailure({
                error: error?.error?.message || this.messages.unknownError,
              })
            )
          )
        );
      })
    )
  );

  // Create Task
  createTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap((action) => {
        return this._taskService.create(action.taskData).pipe(
          map((res) => {
            return TaskActions.createTaskSuccess({
              task: res.data,
              success: 'Task created successfully',
            });
          }),
          catchError((error) =>
            of(
              TaskActions.createTaskFailure({
                error: error?.error?.message || this.messages.unknownError,
              })
            )
          )
        );
      })
    )
  );

  // Update Task
  updateTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap((action) => {
        return this._taskService.update(action.taskData, action.id).pipe(
          map((res) => {
            return TaskActions.updateTaskSuccess({
              task: res,
              success: 'Task updated successfully',
            });
          }),
          catchError((error) =>
            of(
              TaskActions.updateTaskFailure({
                error: error?.error?.message || this.messages.unknownError,
              })
            )
          )
        );
      })
    )
  );

  // Delete Task
  deleteTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap((action) => {
        return this._taskService.delete(action.id).pipe(
          map(() => {
            return TaskActions.deleteTaskSuccess({
              id: action.id,
              success: 'Task deleted successfully',
            });
          }),
          catchError((error) =>
            of(
              TaskActions.deleteTaskFailure({
                error: error?.error?.message || this.messages.unknownError,
              })
            )
          )
        );
      })
    )
  );

  // ------------------------------------------------------------------------------------------
  // @ Alerts
  // ------------------------------------------------------------------------------------------

  //   onTaskActionSuccess$ = createEffect(
  //     () =>
  //       this._actions$.pipe(
  //         ofType(
  //           TaskActions.createTaskSuccess,
  //           TaskActions.updateTaskSuccess,
  //           TaskActions.deleteTaskSuccess
  //         ),
  //         tap((action) => {
  //           this._alertService.showAlert(action.success, 'success');
  //         })
  //       ),
  //     { dispatch: false }
  //   );

  //   onTaskActionFailure$ = createEffect(
  //     () =>
  //       this._actions$.pipe(
  //         ofType(
  //           TaskActions.loadTasksFailure,
  //           TaskActions.loadTaskFailure,
  //           TaskActions.createTaskFailure,
  //           TaskActions.updateTaskFailure,
  //           TaskActions.deleteTaskFailure
  //         ),
  //         tap((action) => {
  //           this._alertService.showAlert(action.error, 'error');
  //         })
  //       ),
  //     { dispatch: false }
  //   );
}
