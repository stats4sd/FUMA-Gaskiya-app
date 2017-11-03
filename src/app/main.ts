import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//magic
import { enableProdMode } from '@angular/core'

import { AppModule } from './app.module';


//magic
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
