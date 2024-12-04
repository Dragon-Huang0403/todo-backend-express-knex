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

describe('POST /v1/auth/login, user login', function () {
  const action = async (body) => {
    const response = await request(app).post('/v1/auth/login').send(body);
    return response;
  };

  it('should return 200 and response', async () => {
    const email = `${helper.randomString(10)}@gmail.com`;
    const password = helper.randomString(10);

    await helper.prepareUser(email, password);

    const response = await action({ email, password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return valid token', async () => {
    const email = `${helper.randomString(10)}@gmail.com`;
    const password = helper.randomString(10);

    await helper.prepareUser(email, password);

    const response = await action({ email, password });
    const token = response.body.token;
    const decoded = jwtUtils.verifyToken(token);
    expect(decoded).toHaveProperty('userId');
  });

  it('should return 400 if request body is invalid', async () => {
    const response = await action({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 404 if user is not exist', async () => {
    const email = `${helper.randomString(10)}@gmail.com`;
    const password = helper.randomString(10);

    const response = await action({ email, password });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});
