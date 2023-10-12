import { initContract } from '@ts-rest/core';
import { postsContract } from './lib/posts-contract';
import { usersContract } from './lib/users-contract';

export const contract = initContract().router({
  posts: postsContract,
  users: usersContract,
});

export * from './lib/posts-contract';
export * from './lib/users-contract';
