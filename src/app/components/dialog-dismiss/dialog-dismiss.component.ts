import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'dialog-dismiss',
    standalone: true,
    imports: [MatDialogModule, MatIconModule],
    templateUrl: './dialog-dismiss.component.html',
    styleUrl: './dialog-dismiss.component.scss',
})
export class DialogDismissComponent {}
