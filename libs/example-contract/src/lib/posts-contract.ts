// contract.ts

import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});

export const postsContract = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    responses: {
      201: PostSchema,
    },
    body: PostSchema,
    summary: 'Create a post',
  },
  getPosts: {
    method: 'GET',
    path: '/posts',
    responses: {
      200: z.array(PostSchema),
    },
    summary: 'Get all posts',
  },
  getPost: {
    method: 'GET',
    path: `/posts/:id`,
    responses: {
      200: PostSchema.nullable(),
    },
    summary: 'Get a post by id',
  },
});
