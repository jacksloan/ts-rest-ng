import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppRouter, initClient, InitClientArgs } from '@ts-rest/core';
import { catchError, from, lastValueFrom, Observable, of } from 'rxjs';

type PromiseToObservable<T extends Record<string, any>> = {
  [key in keyof T]: T[key] extends (...args: any[]) => Promise<any>
    ? (...args: Parameters<T[key]>) => Observable<Awaited<ReturnType<T[key]>>>
    : T[key] extends Record<string, any>
    ? PromiseToObservable<T[key]>
    : never;
};

export function initNgClient<
  Router extends AppRouter,
  Args extends InitClientArgs
>(
  router: Router,
  args: Args
): PromiseToObservable<ReturnType<typeof initClient<Router, Args>>> {
  const httpClient = inject(HttpClient);

  const tsRestClient = initClient<Router, Args>(router, {
    ...args,
    api: async ({ path, method, headers, body }) => {
      const response = await lastValueFrom(
        httpClient
          .request(method, `${args.baseUrl}/${path}`, {
            headers: { ...args.baseHeaders, ...headers },
            body,
            observe: 'response',
          })
          .pipe(
            catchError((err) =>
              of({
                headers: err.headers,
                body: err.error,
                status: err.status,
              })
            )
          )
      );

      return {
        headers: response.headers,
        body: response.body,
        status: response.status,
      };
    },
  });

  return proxyPromiseToObservable(tsRestClient);
}

function proxyPromiseToObservable(client: any): any {
  return new Proxy(client, {
    get: (target, prop: string) => proxyPromiseToObservable(target[prop]),
    apply: (target: any, thisArg: any, argArray: any[]) =>
      from(target(...argArray)),
  });
}
