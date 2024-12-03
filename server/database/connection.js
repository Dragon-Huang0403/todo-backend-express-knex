// Abstraction layer to handle knex configuration per enviornment.
const config = require('../knexfile.js');

module.exports = require('knex')(config);
