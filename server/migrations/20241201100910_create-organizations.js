/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('organizations', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('owner_id').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

    table
      .foreign('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('organizations');
};
