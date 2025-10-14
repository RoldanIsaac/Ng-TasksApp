import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { positionOptions } from '../../core/constants/tooltip-positions';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-table-actions',
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './table-actions.component.html',
  styleUrl: './table-actions.component.css',
})
export class TableActionsComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  actions = input.required<string[]>();
  disableActions = input<boolean>();
  isInvalid = input<boolean>();

  isEdit = signal<boolean>(false);
  isDelete = signal<boolean>(false);

  @Output() editEmit = new EventEmitter();
  @Output() deleteEmit = new EventEmitter();

  isIcon: boolean = false;
  actionIconNames = ['delete', 'edit'];
  positionOptions = positionOptions;

  constructor(private _uiService: UiService) {}

  // ------------------------------------------------------------------------------------------
  // @ Lifecycle Hooks
  // ------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.handleParentEntity();

    // Registering Huge Icons
    this._uiService.registerSvgIcons(this.actionIconNames);
    this.isIcon = true;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // ------------------------------------------------------------------------------------------
  // @ Public Methods
  // ------------------------------------------------------------------------------------------

  handleParentEntity(): void {
    if (this.actions().includes('edit')) {
      this.isEdit.set(true);
    }
    if (this.actions().includes('delete')) {
      this.isDelete.set(true);
    }
  }

  // Common actions
  onEdit(): void {
    if (this.disableActions()) {
      return;
    }
    this.editEmit.emit();
  }

  onDelete(): void {
    if (this.disableActions()) {
      return;
    }
    this.deleteEmit.emit();
  }
}
