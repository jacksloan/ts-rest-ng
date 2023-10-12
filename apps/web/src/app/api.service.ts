import { InjectionToken } from '@angular/core';
import { contract } from '@ts-rest-ng/api-contract';
import { initNgClient } from 'ts-rest-ng/client';

export function createApiClient() {
  return initNgClient(contract, {
    baseHeaders: {},
    baseUrl: 'http://localhost:3333',
  });
}

export const ApiService = new InjectionToken<ReturnType<typeof createApiClient>>('ts-rest-ng-client');
