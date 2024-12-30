import { Application } from '@nativescript/core';
import { AppComponent } from './src/app.component';

Application.run({ create: () => new AppComponent().$start() });