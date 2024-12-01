const knex = require('./connection.js');

async function all(organization_id) {
  return knex('todos').where({ organization_id });
}

async function get(id) {
  const results = await knex('todos').where({ id });
  return results[0];
}

async function create({ title, assignee_id, organization_id }) {
  const results = await knex('todos')
    .insert({ title, assignee_id, organization_id })
    .returning('*');
  return results[0];
}

async function update({ id, title, assignee_id, completed }) {
  const results = await knex('todos')
    .where({ id })
    .update({ title, assignee_id, completed })
    .returning('*');
  return results[0];
}

async function remove(id) {
  await knex('todos').where({ id }).del();
}

module.exports = {
  all,
  get,
  create,
  update,
  remove,
};
