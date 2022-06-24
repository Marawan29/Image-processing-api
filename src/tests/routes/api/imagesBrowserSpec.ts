import request from 'supertest';
import app from '../../../index';

describe('GET /api/imagesBrower', (): void => {
  it('tests if the endpoint is working', async (done): Promise<void> => {
    request(app)
      .get('/api/imagesBrowser')
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      });
  });
});
