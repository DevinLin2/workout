import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarRowComponent } from '../calendar-row/calendar-row.component';
import { Week } from '../models/week-enum';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'calendar-grid',
    imports: [
        CalendarRowComponent,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
    ],
    templateUrl: './calendar-grid.component.html',
    styleUrl: './calendar-grid.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarGridComponent {
    private calendarCache: { [key: string]: Date[][] } = {};
    weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    calendarDates: Date[][] = [];
    monthStr!: string;
    month!: number;
    year!: number;

    ngOnInit() {
        this.generateCalendarDates(new Date());
    }

    prevMonth() {
        this.generateCalendarDates(new Date(this.year, this.month - 1));
    }

    nextMonth() {
        this.generateCalendarDates(new Date(this.year, this.month + 1));
    }

    onDateChange(date: Date) {
        this.generateCalendarDates(date);
    }

    generateCalendarDates(targetDate: Date) {
        const month = targetDate.getMonth();
        const year = targetDate.getFullYear();
        const cacheKey = `${month}-${year}`;

        if (this.calendarCache[cacheKey]) {
            this.calendarDates = this.calendarCache[cacheKey];
        } else {
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0); // 0 is the last day of the previous month
            
            const dates = this.generateDates(firstDayOfMonth, lastDayOfMonth);
            
            this.calendarDates = this.splitIntoWeeks(dates);
            this.calendarCache[cacheKey] = this.calendarDates;
        }

        this.month = month;
        this.year = year;
        this.monthStr = targetDate.toLocaleString('default', { month: 'long' });
    }

    generateDates(firstDayOfMonth: Date, lastDayOfMonth: Date): Date[] {
        // dates will start from Sunday
        const dates: Date[] = [];
        const year = firstDayOfMonth.getFullYear();
        const month = firstDayOfMonth.getMonth();
        
        // generate dates of the previous month to fill in the first week of the current month if first day of current month is not Sunday
        let firstDay = firstDayOfMonth.getDay();
        for (let offset = firstDay - Week.MONDAY; offset >= 0; offset--) {
            const date = new Date(year, month, -offset);
            dates.push(date);
        }

        for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date));
        }

        // generate dates of the next month to fill in the last week of the current month if last day of current month is not Saturday
        let lastDay = lastDayOfMonth.getDay();
        for (let offset = 1; offset <= Week.SATURDAY - lastDay; offset++) {
            const date = new Date(year, month + 1, offset);
            dates.push(date);
        }
        return dates;
    }

    splitIntoWeeks(dates: Date[]): Date[][] {
        if (dates.length % Week.DAYSINWEEK !== 0) {
            throw new Error('Dates do not fill in full calendar');
        }

        const weeks: Date[][] = [];
        let week: Date[] = [];

        dates.forEach((date, index) => {
            week.push(date);
            if ((index + 1) % Week.DAYSINWEEK === 0) {
                weeks.push(week);
                week = [];
            }
        });
    
        return weeks;
    }

    trackByWeek(index: number, week: Date[]): string {
        return week[0].toISOString();
    }
}
