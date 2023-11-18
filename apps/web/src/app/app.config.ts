import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { ApiService } from './api.service';
import { appRoutes } from './app.routes';
import { initNgClient } from 'ts-rest-ng/client';
import { contract } from '@ts-rest-ng/example-contract';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    {
      provide: ApiService,
      useFactory: () =>
        initNgClient(contract, {
          baseHeaders: {},
          baseUrl: 'http://localhost:3333',
        }),
    },
  ],
};
