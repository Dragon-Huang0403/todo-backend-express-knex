/* 
  Update with your config settings.
  The test database and development database are by default the same.
  Knex also allows for easy switching between databases. 
  But the .returning() method will only work for PostgreSQL, MSSQL, and Oracle databases.
*/
const config = require('./config/config.js');

module.exports = {
  client: 'postgresql',
  connection: {
    host: config.PG_HOST,
    port: config.PG_PORT,
    user: config.PG_USER,
    password: config.PG_PASSWORD,
    database: config.PG_DATABASE,
  },
  pool: {
    min: config.PG_POOL_MIN,
    max: config.PG_POOL_MAX,
  },
  migrations: {
    tableName: config.PG_MIGRATION_TABLE_NAME,
  },
};
