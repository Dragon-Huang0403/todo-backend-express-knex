const knex = require('./connection.js');

async function create({ user_id, organization_id }) {
  return knex('join_org_requests').insert({ user_id, organization_id });
}

async function get({ user_id, organization_id }) {
  return knex('join_org_requests').where({ user_id, organization_id }).first();
}

async function acceptInvitation({ user_id, organization_id }) {
  return knex.transaction(async (trx) => {
    await trx('user_organization_bindings').insert({
      user_id: user_id,
      organization_id: organization_id,
      role: 'member',
    });

    return trx('join_org_requests').where({ user_id, organization_id }).del();
  });
}

module.exports = {
  create,
  get,
  acceptInvitation,
};
