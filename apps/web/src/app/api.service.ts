import {InjectionToken} from '@angular/core';
import {contract} from '@ts-rest-ng/api-contract';
import {inferType} from "ts-rest-ng/client";

export const ApiService = new InjectionToken<inferType<typeof contract>>('ts-rest-ng-client');
