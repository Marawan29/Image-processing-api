import request from 'supertest';
import app from '../index';

describe('Get /', () => {
  it('tests if the server is working', async (done): Promise<void> => {
    request(app)
      .get('/')
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      });
  });
});
