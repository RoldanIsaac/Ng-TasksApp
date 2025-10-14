// Reducers & Effects
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TasksEffects } from '../../modules/tasks/store/tasks.effects';
import { tasksReducer } from '../../modules/tasks/store/tasks.reducer';

export const ngrxConfig: ApplicationConfig['providers'] = [
  provideStore(),

  // ---------------------------------------------------------------------------------
  // @
  // ---------------------------------------------------------------------------------

  // Tasks
  provideEffects(TasksEffects),
  provideState({ name: 'tasks', reducer: tasksReducer }),

  provideStoreDevtools({
    maxAge: 25, // Retains last 25 states
    logOnly: !isDevMode(), // Restrict extension to log-only mode
    autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    connectInZone: true, // If set to true, the connection is established within the Angular zone
  }),
];
