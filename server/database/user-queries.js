const knex = require('./connection.js');

async function get(id) {
  const results = await knex('users').where({ id }).first();
  return results;
}

async function findByEmail(email) {
  return knex('users').where({ email }).first();
}

async function create({ username, email, hashed_password }) {
  const results = await knex('users')
    .insert({ username, email, hashed_password })
    .returning('*');
  return results[0];
}

module.exports = {
  get,
  findByEmail,
  create,
};
