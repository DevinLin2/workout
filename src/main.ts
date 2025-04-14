import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './calendar/calendar.config';
import { LoginFormComponent } from './login/login-form/login-form.component';

bootstrapApplication(LoginFormComponent, appConfig)
  .catch((err) => console.error(err));
