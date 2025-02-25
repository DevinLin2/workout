import { Component } from '@angular/core';
import { CalendarRowComponent } from '../calendar-row/calendar-row.component';

@Component({
    selector: 'calendar-grid',
    imports: [CalendarRowComponent],
    templateUrl: './calendar-grid.component.html',
    styleUrl: './calendar-grid.component.css'
})
export class CalendarGridComponent {
    
}