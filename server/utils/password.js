const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

module.exports = {
  hashPassword,
};
