import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { Week } from '../models/week-enum';

@Component({
    selector: 'calendar-row',
    imports: [CalendarCellComponent],
    templateUrl: './calendar-row.component.html',
    styleUrl: './calendar-row.component.css'
})
export class CalendarRowComponent implements OnChanges{
    week = input.required<Date[]>();
    today = input.required<Date>();
    month = input.required<number>();

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['week'] && this.week().length !== Week.DAYSINWEEK) {
            throw new Error('Input week does not contain seven days');
        }
    }
}
