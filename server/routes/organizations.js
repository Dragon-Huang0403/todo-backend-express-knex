const organizations = require('../database/organization-queries.js');
const Joi = require('joi');

function createOrganization() {
  const requestSchema = Joi.object({
    name: Joi.string().min(6).max(20).required(),
  });

  return async function (req, res) {
    const { error, value } = requestSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }

    // TODO: use middleware to validate the user is logged in
    const user = req.user;

    const organization = await organizations.create({
      name: value.name,
      owner_id: 12,
    });
    res.status(201).send(organization);
  };
}

module.exports = {
  createOrganization,
};
