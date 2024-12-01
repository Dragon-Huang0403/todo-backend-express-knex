const users = require('../database/user-queries.js');
const psUtils = require('../utils/password.js');

function userResponse(user) {
  return {
    username: user.username,
    email: user.email,
    id: user.id,
    createdAt: user.created_at,
  };
}

async function createUser(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = await psUtils.hashPassword(password);

  const result = await users.create({
    username,
    email,
    hashed_password: hashedPassword,
  });
  return res.send(userResponse(result));
}

module.exports = {
  createUser,
};
