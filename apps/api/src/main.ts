/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  PostSchema,
  contract,
  postsContract,
  usersContract,
} from '@ts-rest-ng/example-contract';
import { createExpressEndpoints, initServer } from '@ts-rest/express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { z } from 'zod';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

type Post = z.infer<typeof PostSchema>;
const db: Map<string, Post> = new Map();

db.set('1', {
  id: '1',
  title: 'First Post',
  body: 'Lorem Ipsum...',
});

db.set('2', {
  id: '2',
  title: 'Second Post',
  body: 'Lorem Ipsum...',
});

db.set('3', {
  id: '3',
  title: 'Third Post',
  body: 'Lorem Ipsum...',
});

const postsRouter = s.router(postsContract, {
  getPost: async ({ params: { id } }) => {
    return {
      status: 200,
      body: db.get(id),
    };
  },
  getPosts: async () => {
    return {
      status: 200,
      body: Array.from(db.values()),
    };
  },
  createPost: async ({ body }) => {
    db.set(body.id, body);

    return {
      status: 201,
      body,
    };
  },
});

const usersRouter = s.router(usersContract, {
  getUser: async ({ params: { id } }) => {
    return {
      status: 200,
      body: {
        id,
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  createUser: async ({ body }) => {
    return {
      status: 201,
      body,
    };
  },
});

const router = s.router(contract, {
  posts: postsRouter,
  users: usersRouter,
});

createExpressEndpoints(contract, router, app);

  const port = process.env.port || 3333;

app.get('/', (req, res) => {
    return res.status(200).send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
