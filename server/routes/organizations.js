const organizations = require('../database/organization-queries.js');
const joinOrgRequests = require('../database/join-org-request-queries.js');

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

    const user = req.user;

    const organization = await organizations.create({
      name: value.name,
      owner_id: user.userId,
    });
    res.status(201).send(organization);
  };
}

function listOrganizations() {
  return async function (_, res) {
    const organizationsList = await organizations.all();
    res.send(organizationsList);
  };
}

function createJoinOrgInvitation() {
  const requestSchema = Joi.object({
    userId: Joi.number().required(),
  });

  return async function (req, res) {
    const { error, value } = requestSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }

    const user = req.user;

    const { organizationId } = req.params;
    const { role } = await organizations.getUserRole({
      user_id: user.userId,
      organization_id: organizationId,
    });

    if (role !== 'admin') {
      return res.status(403).send({ error: 'Forbidden' });
    }

    await joinOrgRequests.create({
      user_id: value.userId,
      organization_id: organizationId,
    });

    res.status(200).send({ success: true });
  };
}

function acceptInvitation() {
  return async function (req, res) {
    const user = req.user;
    const { organizationId } = req.params;

    const result = await joinOrgRequests.get({
      user_id: user.userId,
      organization_id: organizationId,
    });

    if (!result) {
      return res.status(404).send({ error: 'Not found' });
    }

    await joinOrgRequests.acceptInvitation({
      user_id: user.userId,
      organization_id: organizationId,
    });

    res.status(200).send({ success: true });
  };
}

module.exports = {
  createOrganization,
  listOrganizations,
  createJoinOrgInvitation,
  acceptInvitation,
};
