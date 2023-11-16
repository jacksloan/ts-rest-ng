import {InjectionToken} from '@angular/core';
import {contract} from '@ts-rest-ng/api-contract';
import {inferClient} from "ts-rest-ng/client";

export const ApiService = new InjectionToken<inferClient<typeof contract>>('ts-rest-ng-client');
