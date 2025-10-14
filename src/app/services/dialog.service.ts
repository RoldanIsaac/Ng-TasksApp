import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly _dialog = inject(MatDialog);

  closeModal(): void {
    this._dialog.closeAll();
  }

  openModal<CT, T>(
    componentRef: ComponentType<CT>,
    data?: T,
    isEditing = false,
    minWidth: string = '500px'
  ): Observable<any> {
    const dialogFeatures = { data, isEditing };

    // Set dialog configuration
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Prevent closing on outside
    dialogConfig.data = dialogFeatures;
    dialogConfig.maxHeight = '650px';
    dialogConfig.minWidth = minWidth;

    let dialogRef = this._dialog.open(componentRef, dialogConfig);

    /**
     * Subscribe to result afterClosed()
     */
    return dialogRef.afterClosed().pipe(
      take(1),
      map((res) => res ?? null)
    );
  }
}
