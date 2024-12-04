const knex = require('../../database/connection.js');
const psUtils = require('../../utils/password.js');

/**
 * Generates a random string
 * @param {number} length - The length of the random string to generate.
 * @returns {string} A random string containing both alphabets (uppercase and lowercase) and digits.
 */
function randomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

/**
 * Prepare a user in the database
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<number>} The ID of the user
 */
async function prepareUser(email, password) {
  const hashedPassword = await psUtils.hashPassword(password);
  const result = await knex('users')
    .insert({
      username: randomString(10),
      email: email,
      hashed_password: hashedPassword,
    })
    .returning('id');

  return result[0].id;
}

/**
 * Prepare an organization in the database
 * @param {string} name - The name of the organization.
 * @param {number} owner_id - The ID of the owner of the organization.
 * @returns {Promise<number>} The ID of the organization
 */
async function prepareOrganization(name, owner_id) {
  const result = await knex('organizations')
    .insert({
      name,
      owner_id,
    })
    .returning('id');

  await knex('user_organization_bindings').insert({
    user_id: owner_id,
    organization_id: result[0].id,
    role: 'admin',
  });

  return result[0].id;
}

module.exports = {
  randomString,
  prepareUser,
  prepareOrganization,
};
