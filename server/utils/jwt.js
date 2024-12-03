const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

/**
 * @typedef {Object} AuthPayload
 * @property {number} userId - The unique identifier for the user.
 */

/**
 * Create a JWT token for a user
 * @param {number} userId - The user ID
 * @returns {string} The JWT token
 */
function createToken(userId) {
  return jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
    algorithm: 'HS256',
  });
}

/**
 * Verify a JWT token
 * @param {string} token - The JWT token
 * @returns {AuthPayload} The decoded token
 */
function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
