const users = require('../database/user-queries.js');

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

  const result = await users.create({
    username,
    email,
    hashed_password: password,
  });
  return res.send(userResponse(result));
}

module.exports = {
  createUser,
};
