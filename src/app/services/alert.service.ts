import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action: string = '', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  success(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snack-success'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snack-error'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  info(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['snack-info'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  warn(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      panelClass: ['snack-warn'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
