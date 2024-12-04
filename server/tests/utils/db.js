const knex = require('../../database/connection.js');
const config = require('../../config/config.js');

/**
 * Delete data in all tables
 */
async function deleteAllTables() {
  const tables = await knex.raw(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
    `);

  tables.rows.forEach(async (row) => {
    if (row.tablename === config.PG_MIGRATION_TABLE_NAME) {
      return;
    }

    await knex.raw(`DELETE FROM "${row.tablename}";`);
  });
}

async function autoMigration() {
  await knex.migrate.latest();
}

module.exports = {
  deleteAllTables,
  autoMigration,
};
