const todos = require('../database/todo-queries.js');
const Joi = require('joi');

function createTodo() {
  const requestSchema = Joi.object({
    title: Joi.string().min(5).max(20).required(),
    assignee_id: Joi.number().integer().positive().optional().allow(null),
  });

  return async function (req, res) {
    const { error, value } = requestSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }

    const { organizationId } = req.params;

    // TODO: validate assignee is in the organization

    const result = await todos.create({
      title: value.title,
      assignee_id: value.assignee_id,
      organization_id: organizationId,
    });
    return res.status(201).send(result);
  };
}

function getTodo() {
  return async function (req, res) {
    const { todoId } = req.params;
    const todos = await todos.get(todoId);
    if (!todos) {
      return res.status(404).send({ error: 'Todo not found' });
    }
    res.send(todos);
  };
}

function listTodos() {
  return async function (req, res) {
    const { organizationId } = req.params;
    const todos = await todos.all(organizationId);
    res.send(todos);
  };
}

function updateTodo() {
  const requestSchema = Joi.object({
    title: Joi.string().min(5).max(20).optional(),
    assigneeId: Joi.number().integer().positive().optional().allow(null),
    completed: Joi.boolean().optional(),
  });

  return async function (req, res) {
    const { error, value } = requestSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }

    const { todoId } = req.params;

    // TODO: validate assignee is in the organization
    const result = await todos.update({
      id: todoId,
      title: value.title,
      assignee_id: value.assigneeId,
      completed: value.completed,
    });
    return res.send(result);
  };
}

function deleteTodo() {
  return async function (req, res) {
    const { todoId } = req.params;
    await todos.remove(todoId);
    res.status(204).send();
  };
}

module.exports = {
  createTodo,
  getTodo,
  listTodos,
  updateTodo,
  deleteTodo,
};
