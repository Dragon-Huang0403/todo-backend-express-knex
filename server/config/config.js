require('dotenv').config();
const Joi = require('joi');

const schema = Joi.object({
  PG_DATABASE: Joi.string().required(),
  PG_USER: Joi.string().required(),
  PG_PASSWORD: Joi.string().required(),
  PG_HOST: Joi.string().required(),
  PG_PORT: Joi.number().port().default(5432),
  PG_POOL_MIN: Joi.number().default(2),
  PG_POOL_MAX: Joi.number().default(10),
  PG_MIGRATION_TABLE_NAME: Joi.string().default('knex_migrations'),

  PORT: Joi.number().port().default(8080),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('1d'),
}).unknown(true);

// TODO: list only used environment variables, remove unused ones, or changing to parsing library like zod
const { error, value: envVars } = schema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = envVars;
