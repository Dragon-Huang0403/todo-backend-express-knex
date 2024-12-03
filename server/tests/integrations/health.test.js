const request = require('supertest');
const app = require('../../server');

describe('GET /health', function () {
  it('should return 200 and response', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
