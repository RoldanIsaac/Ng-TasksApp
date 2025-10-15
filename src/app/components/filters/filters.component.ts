import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { statuses, TaskStatus } from '../../core/enums/tasks';
import { UiService } from '../../services/ui.service';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FilterService } from '../../services/filter.service';

const MatModules = [
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatLabel,
  MatIcon,
  MatDialogModule,
];

@Component({
  selector: 'app-filters',
  imports: [MatModules, ReactiveFormsModule, CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  private readonly _fb = inject(FormBuilder);

  statuses = statuses;
  isEditing: boolean = false;

  /**
   * Form fields
   */
  formGroup = this._fb.group({
    status: [TaskStatus.PENDING, Validators.required],
  });

  isIcon: boolean = false;
  actionIconNames = ['plus'];

  constructor(
    private _uiService: UiService,
    private _filterService: FilterService
  ) {}

  // --------------------------------------------------------------
  //  @ Lifecycle Hooks
  // --------------------------------------------------------------

  ngOnInit(): void {
    // Registering Huge Icons
    this._uiService.registerSvgIcons(this.actionIconNames);
    this.isIcon = true;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  // --------------------------------------------------------------
  //  @ Lifecycle Hooks
  // --------------------------------------------------------------

  onSelectStatus($event: MatSelectChange): void {
    const filterValue = $event.value;
    this._filterService.status = filterValue;
  }
}
