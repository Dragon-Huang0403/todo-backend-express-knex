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

/**
 * Compares a password to a hashed password using bcrypt.
 * @param {string} password - The password to compare.
 * @param {string} hashedPassword - The hashed password to compare.
 * @returns {Promise<boolean>} - Whether the password matches the hashed password.
 */
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
