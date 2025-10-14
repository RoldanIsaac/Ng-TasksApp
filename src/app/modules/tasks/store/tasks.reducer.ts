import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './tasks.actions';
import { Task } from './tasks.models';

// --------------------------------------------------------------------------------------
// @ States
// --------------------------------------------------------------------------------------

export interface TasksState {
  tasks: Task[];
  task: Task | null;
  isLoading: boolean;
  error: string | null;
}

// --------------------------------------------------------------------------------------
// @ Initial States
// --------------------------------------------------------------------------------------

export const initialTasksState: TasksState = {
  tasks: [],
  task: null,
  isLoading: false,
  error: null,
};

// --------------------------------------------------------------------------------------
// @ Reducers
// --------------------------------------------------------------------------------------

// All Tasks Reducer
export const tasksReducer = createReducer(
  initialTasksState,

  // On Load Tasks
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    isLoading: false,
    tasks: tasks,
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // On Load Single Task
  on(TaskActions.loadTask, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.loadTaskSuccess, (state, { task }) => ({
    ...state,
    isLoading: false,
    task: task,
  })),
  on(TaskActions.loadTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // On Create
  on(TaskActions.createTask, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    isLoading: false,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.createTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // On Update
  on(TaskActions.updateTask, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    isLoading: false,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // On Delete
  on(TaskActions.deleteTask, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    tasks: state.tasks.filter((t) => t.id !== id),
  })),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
