const request = require('supertest');
const app = require('../../server');
const knex = require('../../database/connection.js');
const dbUtils = require('../utils/db.js');

describe('POST /v1/users, create an user', function () {
  beforeAll(async () => {
    await dbUtils.autoMigration();
  });

  beforeEach(async () => {
    await dbUtils.deleteAllTables();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  const action = async () => {
    const response = await request(app).post('/v1/users').send({
      username: 'test-user',
      email: 'test-user@gmail.com',
      password: 'password',
    });
    return response;
  };

  it('should return 201 and response', async () => {
    const response = await action();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', 'test-user');
    expect(response.body).toHaveProperty('email', 'test-user@gmail.com');
    expect(response.body).not.toHaveProperty('password');
    expect(response.body).not.toHaveProperty('hashed_password');
    expect(response.body).toHaveProperty('createdAt');
  });

  it('should be in the database', async () => {
    const { body: userResponse } = await action();
    const user = await knex('users').where({ id: userResponse.id }).first();

    expect(user).toBeDefined();
    expect(user.id).toBe(userResponse.id);
    expect(user.username).toBe(userResponse.username);
    expect(user.email).toBe(userResponse.email);
    expect(user.created_at.getTime()).toBe(
      new Date(userResponse.createdAt).getTime()
    );
    expect(user).toHaveProperty('hashed_password');
  });

  it('should return 409 if email is already in use', async () => {
    await knex('users').insert({
      username: 'not-important',
      email: 'test-user@gmail.com',
      hashed_password: 'not-important',
    });

    const response = await action();
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 if request body is not correct', async () => {
    const response = await request(app).post('/v1/users').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
