const knex = require('./connection.js');

async function create({ user_id, organization_id }) {
  return knex('join_org_requests').insert({ user_id, organization_id });
}

async function get({ user_id, organization_id }) {
  return knex('join_org_requests').where({ user_id, organization_id }).first();
}

async function remove({ user_id, organization_id }) {
  return knex('join_org_requests').where({ user_id, organization_id }).del();
}

module.exports = {
  create,
  get,
  remove,
};
