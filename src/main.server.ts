import { bootstrapApplication } from '@angular/platform-browser';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { config } from './calendar/calendar.config.server';

const bootstrap = () => bootstrapApplication(LoginFormComponent, config);

export default bootstrap;
