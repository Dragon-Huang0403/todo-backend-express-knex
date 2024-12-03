const config = require('../config/config.js');

const knexConfig = {
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

module.exports = require('knex')(knexConfig);
