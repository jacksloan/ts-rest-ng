// create @ts-rest/core client

import { initClient } from '@ts-rest/core';
import { contract } from '@ts-rest-ng/example-contract';
import axios, { AxiosError, AxiosResponse, isAxiosError, Method } from 'axios';

export const client = initClient(contract, {
  baseUrl: 'http://localhost:3333',
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  api: async ({ path, method, headers, body }) => {
    try {
      const result = await axios.request({
        method: method as Method,
        url: `${path}`,
        headers: headers,
        data: body,
      });
      return { status: result.status, body: result.data, headers: JSON.parse(JSON.stringify(result.headers)) };
    } catch (e: Error | AxiosError | any) {
      if (isAxiosError(e)) {
        const err = e.response;
        return { status: err?.status, body: err?.data, headers: JSON.parse(JSON.stringify(err?.headers || {})) };
      }
      throw e;
    }
  },
});
