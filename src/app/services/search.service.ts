import { inject, Injectable } from '@angular/core';
import { TasksService } from '../modules/tasks/services/tasks.service';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private taskService = inject(TasksService);

  constructor() {}

  search(query: string): Observable<any[]> {
    return this.taskService.search(query).pipe(
      catchError((error) => {
        console.error('Error', error);
        return of([]);
      })
    );
  }
}
