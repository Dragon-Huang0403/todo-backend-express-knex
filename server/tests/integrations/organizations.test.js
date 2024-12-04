const request = require('supertest');
const app = require('../../server');
const knex = require('../../database/connection.js');
const helper = require('../utils/helper.js');
const dbUtils = require('../utils/db.js');
const jwtUtils = require('../../utils/jwt.js');

/**
 * Prepare a user and return the user id and token
 */
const prepareUser = async () => {
  const email = `${helper.randomString(10)}@gmail.com`;
  const password = helper.randomString(10);
  const userId = await helper.prepareUser(email, password);
  const token = jwtUtils.createToken(userId);
  return { userId, token };
};

describe('POST /v1/organizations, create an organization', function () {
  beforeAll(async () => {
    await dbUtils.autoMigration();
  });

  beforeEach(async () => {
    await dbUtils.deleteAllTables();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  const action = async ({ token, body }) => {
    const response = await request(app)
      .post('/v1/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    return response;
  };

  it('should return 201 and response', async () => {
    const { userId, token } = await prepareUser();
    const response = await action({
      token,
      body: { name: 'test-organization' },
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('owner_id', userId);
    expect(response.body).toHaveProperty('created_at');
  });

  it('should be in the database', async () => {
    const { userId, token } = await prepareUser();
    const { body: orgResponse } = await action({
      token,
      body: { name: 'test-organization' },
    });

    const organization = await knex('organizations')
      .where({ id: orgResponse.id })
      .first();

    expect(organization).toBeDefined();
    expect(organization.id).toBe(orgResponse.id);
    expect(organization.name).toBe(orgResponse.name);
    expect(organization.owner_id).toBe(userId);
    expect(organization.created_at.getTime()).toBe(
      new Date(orgResponse.created_at).getTime()
    );
  });

  it('should return 400 if request body is not expected', async () => {
    const { token } = await prepareUser();
    const response = await action({ token, body: {} });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('GET /v1/organizations, list organizations', function () {
  beforeAll(async () => {
    await dbUtils.autoMigration();
  });

  beforeEach(async () => {
    await dbUtils.deleteAllTables();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  const action = async (token) => {
    const response = await request(app)
      .get('/v1/organizations')
      .set('Authorization', `Bearer ${token}`);
    return response;
  };

  it('should return 200 and response', async () => {
    const { userId, token } = await prepareUser();

    for (let i = 0; i < 10; i++) {
      await helper.prepareOrganization(helper.randomString(10), userId);
    }

    const response = await action(token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);

    // TODO: Check the response body
  });

  it('return empty array is not items existed', async () => {
    const { token } = await prepareUser();
    const response = await action(token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('return empty array is not items existed', async () => {
    const user1 = await prepareUser();
    for (let i = 0; i < 10; i++) {
      await helper.prepareOrganization(helper.randomString(10), user1.userId);
    }

    const user2 = await prepareUser();
    const response = await action(user2.token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
