import { Injectable } from '@angular/core';
import { contract } from '@ts-rest-ng/api-contract';
import { initNgClient } from 'ts-rest-ng/client';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly posts = initNgClient(contract, {
    baseHeaders: {},
    baseUrl: 'http://localhost:3333',
  });
}
