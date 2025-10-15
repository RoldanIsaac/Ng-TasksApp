import { Injectable } from '@angular/core';
import { TaskStatus } from '../core/enums/tasks';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _status: Subject<TaskStatus> = new Subject<TaskStatus>();

  constructor() {}

  set status(value: TaskStatus) {
    this._status.next(value);
  }

  get status$(): Observable<TaskStatus> {
    return this._status.asObservable();
  }
}
