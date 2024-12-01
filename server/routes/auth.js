const users = require('../database/user-queries.js');
const psUtils = require('../utils/password.js');
const Joi = require('joi');

function authUserLogin() {
  const requestSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  });

  return async function (req, res) {
    const { error, value } = requestSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }

    const user = await users.findByEmail(value.email);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const passwordMatch = await psUtils.comparePassword(
      value.password,
      user.hashed_password
    );
    if (!passwordMatch) {
      return res.status(401).send({ error: 'Invalid password' });
    }

    return res.send({ token: 'fake-token' });
  };
}

module.exports = {
  authUserLogin,
};
