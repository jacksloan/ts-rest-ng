// contract.ts

import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const usersContract = c.router({
  createUser: {
    method: 'POST',
    path: '/users',
    responses: {
      201: UserSchema,
    },
    body: UserSchema,
    summary: 'Create a user',
  },
  getUser: {
    method: 'GET',
    path: `/users/:id`,
    responses: {
      200: UserSchema.nullable(),
    },
    summary: 'Get a user by id',
  },
});
