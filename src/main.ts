import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { CalendarGridComponent } from './calendar/calendar-grid/calendar-grid.component';

bootstrapApplication(CalendarGridComponent, appConfig)
  .catch((err) => console.error(err));
