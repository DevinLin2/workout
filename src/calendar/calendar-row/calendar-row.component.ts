import { Component } from '@angular/core';
import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';

@Component({
    selector: 'calendar-row',
    imports: [CalendarCellComponent],
    templateUrl: './calendar-row.component.html',
    styleUrl: './calendar-row.component.css'
})
export class CalendarRowComponent {
    
}
