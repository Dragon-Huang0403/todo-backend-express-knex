const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

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
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
    algorithm: 'HS256',
  });
}

/**
 * Verify a JWT token
 * @param {string} token - The JWT token
 * @returns {AuthPayload} The decoded token
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
