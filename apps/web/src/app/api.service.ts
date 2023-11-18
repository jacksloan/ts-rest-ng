import { InjectionToken } from '@angular/core';
import { contract } from '@ts-rest-ng/example-contract';
import { inferNgClient } from 'ts-rest-ng/client';

export const ApiService = new InjectionToken<inferNgClient<typeof contract>>(
  'ts-rest-ng-client'
);
