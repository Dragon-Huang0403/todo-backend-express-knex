const users = require('../database/user-queries.js');
const psUtils = require('../utils/password.js');
const Joi = require('joi');

function userResponse(user) {
  return {
    username: user.username,
    email: user.email,
    id: user.id,
    createdAt: user.created_at,
  };
}

function createUser() {
  const requestSchema = Joi.object({
    username: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  });

  return async function (req, res) {
    const { error, value } = requestSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }

    const hashedPassword = await psUtils.hashPassword(value.password);

    const result = await users.create({
      username: value.username,
      email: value.email,
      hashed_password: hashedPassword,
    });
    return res.send(userResponse(result));
  };
}
module.exports = {
  createUser,
};
