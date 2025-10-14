import {
  Component,
  effect,
  EventEmitter,
  input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Task } from '../../store/tasks.models';
import { CommonModule } from '@angular/common';
import { tasksCols } from './tasks-table.config';
import { TableActionsComponent } from '../../../../components/table-actions/table-actions.component';
import { FiltersComponent } from '../../../../components/filters/filters.component';
import { StatusStylePipe } from '../../../../core/pipes/status-style.pipe';

@Component({
  selector: 'app-tasks-table',
  imports: [
    MatTableModule,
    CommonModule,
    TableActionsComponent,
    FiltersComponent,
    StatusStylePipe,
  ],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.css',
})
export class TasksTableComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  entity = input.required<string>();
  cols = [...tasksCols];
  sortables = [...tasksCols.slice(1, 3)];
  data = input.required<any[]>();
  dataSource = new MatTableDataSource<Task>();

  @Output() addEmit = new EventEmitter();
  @Output() updateEmit = new EventEmitter();
  @Output() deleteEmit = new EventEmitter();

  constructor() {
    effect(() => {
      if (this.data()) {
        this.dataSource.data = this.data();
      }
    });
  }

  // ------------------------------------------------------------------------------------------
  // @ Lifecycle Hooks
  // ------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit(): void {}

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // ------------------------------------------------------------------------------------------
  // @ Public Methods
  // ------------------------------------------------------------------------------------------

  uiColumnNames(columnString: string) {
    if (columnString === 'action') {
      return '';
    } else {
      return columnString.toUpperCase();
    }
  }

  // ------------------------------------------------------------------------------------------
  // @ Emitters
  // ------------------------------------------------------------------------------------------

  onAdd() {
    this.addEmit.emit();
  }

  onEdit(item: Task) {
    this.updateEmit.emit(item);
  }

  onDelete(item: Task) {
    this.deleteEmit.emit(item);
  }
}
