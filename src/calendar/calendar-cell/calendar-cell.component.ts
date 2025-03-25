import { Component, input, OnChanges, SimpleChanges  } from '@angular/core';
import { Week } from '../models/week-enum';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'calendar-cell',
    templateUrl: './calendar-cell.component.html',
    styleUrl: './calendar-cell.component.css',
    imports: [NgStyle],
})
export class CalendarCellComponent implements OnChanges{
    day = input.required<Date>();
    today = input.required<Date>();
    month = input.required<number>();
    isToday: boolean = false;
    cellStyles: { [key: string]: string } = {};

    ngOnChanges(changes: SimpleChanges) {
        this.isToday = this.isDateToday(changes['day'].currentValue, changes['today'].currentValue);
        this.cellStyles = {
            'background-color': this.isToday ? '#e8fde7' : 'white',
            'color': this.ofThisMonth(this.day()) ? 'black' : '#c9c9c9',
        }
    }

    isDateToday(date1: Date, date2: Date): boolean {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    ofThisMonth(date: Date) {
        return date.getMonth() === this.month();
    }
}
