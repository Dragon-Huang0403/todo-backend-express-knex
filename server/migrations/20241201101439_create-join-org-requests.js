/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('join_org_requests', function (table) {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable();
    table.integer('organization_id').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('organization_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE');

    table.unique(['user_id', 'organization_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('join_org_requests');
};
