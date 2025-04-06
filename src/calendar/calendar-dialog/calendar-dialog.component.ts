import { Component, inject, model } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
    date: Date;
}

@Component({
    selector: 'calendar-dialog',
    templateUrl: './calendar-dialog.component.html',
    styleUrl: './calendar-dialog.component.css',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class CalendarDialogComponent {
    readonly dialogRef = inject(MatDialogRef<CalendarDialogComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
    readonly date = model(this.data.date);

    onNoClick(): void {
        this.dialogRef.close();
    }
}
