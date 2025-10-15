import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { statuses, TaskStatus } from '../../../../core/enums/tasks';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UiService } from '../../../../services/ui.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DialogDismissComponent } from '../../../../components/dialog-dismiss/dialog-dismiss.component';
import { MaxLengthDirective } from '../../../../core/directives/input-max-length.directive';

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
  selector: 'app-tasks-add-edit',
  imports: [
    MatModules,
    ReactiveFormsModule,
    CommonModule,
    DialogDismissComponent,
    MaxLengthDirective,
  ],
  templateUrl: './tasks-add-edit.component.html',
  styleUrl: './tasks-add-edit.component.css',
})
export class TasksAddEditComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  statuses = statuses;
  isEditing: boolean = false;

  /**
   * Form fields
   */
  formGroup = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: [TaskStatus.PENDING, Validators.required],
  });

  isIcon: boolean = false;
  actionIconNames = ['plus'];

  constructor(
    public dialogRef: MatDialogRef<TasksAddEditComponent>,
    private _uiService: UiService
  ) {}

  // --------------------------------------------------------------
  //  @ Lifecycle Hooks
  // --------------------------------------------------------------

  ngOnInit(): void {
    this.isEditing = this._matDialog.isEditing;
    this.patchOnEditing();

    // Registering Huge Icons
    this._uiService.registerSvgIcons(this.actionIconNames);
    this.isIcon = true;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  // --------------------------------------------------------------
  //  @ Public Methods
  // --------------------------------------------------------------

  patchOnEditing(): void {
    if (!this._matDialog.isEditing) {
      return;
    }

    // Debug
    // console.log(this._matDialog.data);
    const data = this._matDialog.data;

    this.formGroup.patchValue(
      {
        title: data.title,
        description: data.description,
        status: data.status,
      },
      { emitEvent: true }
    );
  }

  // --------------------------------------------------------------
  //  @ Public Methods
  // --------------------------------------------------------------

  onKeyDown(event: KeyboardEvent) {
    // Allow only numbers and the next buttons
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Enter',
      '.',
    ];

    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Block if not a number
    }
  }

  /**
   * @description
   * Since the form could be opened in add or edit mode,
   * the title must be toggled as well.
   * @returns
   */
  getTitle(): string {
    return this._matDialog.isEditing ? `Edit Task` : `Add Task`;
  }

  /**
   * @description
   */
  onSubmit() {
    // this._formsService.markFormGroupTouched(this.formGroup);
    // this._formsService.logInvalidFormValues(this.formGroup);

    // If the form is invalid do nothing
    if (this.formGroup.invalid) {
      return;
    }

    // --------------------------------------------------------------
    // @ Compose form data
    // --------------------------------------------------------------

    const formData = new FormData();

    formData.set('title', this.formGroup.value.title ?? '');
    formData.set('description', this.formGroup.value.description ?? '');
    formData.set('status', this.formGroup.value.status ?? '');

    this.dialogRef.close(formData);
  }
}
