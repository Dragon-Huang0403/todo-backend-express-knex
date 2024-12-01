/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    'user_organization_bindings',
    function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.integer('organization_id').unsigned().notNullable();
      table
        .enu('role', ['admin', 'member'], {
          useNative: true,
          enumName: 'user_organization_role',
        })
        .notNullable();

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
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('user_organization_bindings');
  await knex.raw('DROP TYPE IF EXISTS user_organization_role');
};
