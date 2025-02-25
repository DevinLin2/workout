import { bootstrapApplication } from '@angular/platform-browser';
import { CalendarGridComponent } from './calendar/calendar-grid/calendar-grid.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(CalendarGridComponent, config);

export default bootstrap;
