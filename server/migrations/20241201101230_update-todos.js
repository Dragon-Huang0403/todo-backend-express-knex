/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('todos', function (table) {
    table.string('title').notNullable().alter();
    table.dropColumn('order');
    table.boolean('completed').defaultTo(false).notNullable().alter();
    table.integer('assignee_id').unsigned();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.integer('organization_id').unsigned().notNullable();

    table
      .foreign('assignee_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .foreign('organization_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('todos', function (table) {
    table.string('title').nullable().alter();
    table.integer('order').nullable();
    table.dropColumn('assignee_id');
    table.dropColumn('created_at');
    table.dropColumn('organization_id');
  });
};
