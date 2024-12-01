const knex = require('./connection.js');

async function create({ name, owner_id }) {
  let organization;
  await knex.transaction(async (trx) => {
    const organizations = await knex('organizations')
      .insert({ name, owner_id })
      .returning('*');

    organization = organizations[0];

    await trx('user_organization_bindings').insert({
      user_id: owner_id,
      organization_id: organization.id,
      role: 'admin',
    });
  });
  return organization;
}

async function all() {
  return knex('organizations');
}

async function getUserRole({ user_id, organization_id }) {
  return knex('user_organization_bindings')
    .where({ user_id, organization_id })
    .select('role')
    .first();
}

module.exports = {
  create,
  all,
  getUserRole,
};
