const organizations = require('../database/organization-queries.js');
const jwtUtils = require('../utils/jwt.js');

/**
 * Middleware to check if the user is authenticated,
 * and if so, attach the user
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwtUtils.verifyToken(token);

    req.user = payload;

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Middleware to check if the user is in the organization
 */
async function authzMiddleware(req, res, next) {
  const user = req.user;
  const organizationId = req.params.organizationId;
  const role = await organizations.getUserRole({
    user_id: user.userId,
    organization_id: organizationId,
  });

  if (!role) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
}

module.exports = {
  authMiddleware,
  authzMiddleware,
};
