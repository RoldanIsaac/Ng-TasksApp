// ------------------------------------------------------------------------------------------
// @ Task Actions
// ------------------------------------------------------------------------------------------

import { createAction, props } from '@ngrx/store';
import { Task } from './tasks.models';

// Load all Tasks
export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

// Load single Task
export const loadTask = createAction(
  '[Task] Load Task',
  props<{ id: number }>()
);
export const loadTaskSuccess = createAction(
  '[Task] Load Task Success',
  props<{ task: any }>()
);
export const loadTaskFailure = createAction(
  '[Task] Load Task Failure',
  props<{ error: string }>()
);

// Create
export const createTask = createAction(
  '[Task] Create Task',
  props<{ taskData: any }>()
);
export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: any; success: string }>()
);
export const createTaskFailure = createAction(
  '[Task] Create Task Failure',
  props<{ error: string }>()
);

// Update
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ taskData: Partial<Task>; id: number }>()
);
export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: any; success: string }>()
);
export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: string }>()
);

// Delete
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: number }>()
);
export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: number; success: string }>()
);
export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: string }>()
);
