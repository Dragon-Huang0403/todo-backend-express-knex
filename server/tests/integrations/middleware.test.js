const request = require('supertest');
const app = require('../../server');
const knex = require('../../database/connection.js');
const dbUtils = require('../utils/db.js');
const helper = require('../utils/helper.js');
const jwtUtils = require('../../utils/jwt.js');

beforeAll(async () => {
  await dbUtils.autoMigration();
});

beforeEach(async () => {
  await dbUtils.deleteAllTables();
});

afterAll(async () => {
  await knex.destroy();
});

const testRoutes = [
  {
    method: 'post',
    path: '/v1/organizations',
  },
  {
    method: 'get',
    path: '/v1/organizations',
  },
  {
    method: 'post',
    path: '/v1/organizations/123/invite',
  },
  {
    method: 'post',
    path: '/v1/organizations/123/accept',
  },
  {
    method: 'post',
    path: '/v1/organizations/123/todos',
  },
  {
    method: 'get',
    path: '/v1/organizations/123/todos/123',
  },
  {
    method: 'patch',
    path: '/v1/organizations/123/todos/123',
  },
  {
    method: 'delete',
    path: '/v1/organizations/123/todos/123',
  },
];

describe('Auth Middleware', function () {
  it('should return 401 when token is not existed', async () => {
    for (let i = 0; i < testRoutes.length; i++) {
      const { method, path } = testRoutes[i];

      const response = await request(app)[method](path);
      expect(response.status).toBe(401);
    }
  });
});
