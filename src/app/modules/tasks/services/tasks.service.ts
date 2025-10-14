import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Task } from '../store/tasks.models';
import { TaskEndpoints } from '../../../core/enums/tasks';
import { ApiService } from '../../../api/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _task: ReplaySubject<Task> = new ReplaySubject<Task>(1);
  private _endpoint = TaskEndpoints;
  private _apiService = inject(ApiService);

  // --------------------------------------------------------------------------------
  // @ Accessors
  // --------------------------------------------------------------------------------

  /**
   * Setter & getter for task
   *
   * @param value
   */
  set task(value: Task) {
    this._task.next(value);
  }

  get task$(): Observable<Task> {
    return this._task.asObservable();
  }

  // --------------------------------------------------------------------------------
  // @ Public methods
  // --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  // @ CRUD methods
  // --------------------------------------------------------------------------------

  /**
   * @description
   * Get all tasks
   * @returns
   */
  getAll(): Observable<Task[]> {
    return this._apiService.get(this._endpoint.getAll);
  }

  /**
   * @description
   * Get single task
   * @returns
   */
  getOne(id: number): Observable<Task> {
    return this._apiService.getOne(this._endpoint.getOne, id);
  }

  /**
   * @description
   * Create a new task
   * @returns
   */
  create(taskData: Partial<Task>): Observable<any> {
    return this._apiService.post(this._endpoint.create, taskData);
  }

  /**
   * @description
   * Update a task
   * @returns
   */
  update(taskData: Partial<Task>, id: number): Observable<any> {
    return this._apiService.update(this._endpoint.update, taskData, id);
  }

  /**
   * @description
   * Delete a task
   * @returns
   */
  delete(id: number): Observable<any> {
    return this._apiService.delete(this._endpoint.delete, id);
  }
}
