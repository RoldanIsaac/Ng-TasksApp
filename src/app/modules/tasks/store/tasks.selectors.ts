import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

// -----------------------------------------------------------------------------------------------------
// @ Feature Selectors
// -----------------------------------------------------------------------------------------------------

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

// -----------------------------------------------------------------------------------------------------
// @ Task
// -----------------------------------------------------------------------------------------------------

export const selectAllTasks = createSelector(
  selectTasksState,
  (state: TasksState) => state.tasks
);

export const selectSingleTask = createSelector(
  selectTasksState,
  (state: TasksState) => state.task
);
