const knex = require('../../database/connection.js');
const config = require('../../config/config.js');

/**
 * Truncate all tables in the database
 */
async function truncateAllTables() {
  const tables = await knex.raw(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
    `);

  tables.rows.forEach(async (row) => {
    if (row.tablename === config.PG_MIGRATION_TABLE_NAME) {
      return;
    }

    await knex.raw(`TRUNCATE TABLE "${row.tablename}" CASCADE;`);
  });
}

async function autoMigration() {
  await knex.migrate.latest();
}

module.exports = {
  truncateAllTables,
  autoMigration,
};
