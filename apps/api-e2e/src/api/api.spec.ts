import { client } from '../support/client';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await client.posts.getPosts();
    expect(res.status).toBe(200);

    if (res.status === 200) {
      expect(res.body).toHaveLength(3);
    }
  });
});
