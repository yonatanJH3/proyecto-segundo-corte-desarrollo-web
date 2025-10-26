import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { appConfigServer } from './app/app.config.server';
import { AppComponent } from './app/app.component';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AppComponent, appConfigServer, context);

export default bootstrap;