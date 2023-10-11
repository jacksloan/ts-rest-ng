/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { PostSchema, contract } from '@ts-rest-ng/api-contract';
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

const router = s.router(contract, {
  getPost: async ({ params: { id } }) => {
    return {
      status: 200,
      body: db.get(id),
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

createExpressEndpoints(contract, router, app);

const port = process.env.port || 3333;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
