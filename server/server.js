const app = require('./server-config.js');
const routes = require('./routes/index.js');
const middlewares = require('./routes/middlewares.js');

app.get('/health', (_, res) => {
  res.send({ status: 'ok' });
});

app.post('/v1/users', routes.createUser);
app.post('/v1/auth/login', routes.authUserLogin);

app.post(
  '/v1/organizations',
  middlewares.authMiddleware,
  routes.createOrganization
);
app.get(
  '/v1/organizations',
  middlewares.authMiddleware,
  routes.listOrganizations
);
app.post(
  '/v1/organizations/:organizationId/invite',
  middlewares.authMiddleware,
  routes.createJoinOrgInvitation
);
app.post(
  '/v1/organizations/:organizationId/accept',
  middlewares.authMiddleware,
  routes.acceptInvitation
);

app.post(
  '/v1/organizations/:organizationId/todos',
  middlewares.authMiddleware,
  middlewares.authzMiddleware,
  routes.createTodo
);

app.get(
  '/v1/organizations/:organizationId/todos/:todoId',
  middlewares.authMiddleware,
  middlewares.authzMiddleware,
  routes.getTodo
);

app.get(
  '/v1/organizations/:organizationId/todos',
  middlewares.authMiddleware,
  middlewares.authzMiddleware,
  routes.listTodos
);

app.patch(
  '/v1/organizations/:organizationId/todos/:todoId',
  middlewares.authMiddleware,
  middlewares.authzMiddleware,
  routes.updateTodo
);

app.delete(
  '/v1/organizations/:organizationId/todos/:todoId',
  middlewares.authMiddleware,
  middlewares.authzMiddleware,
  routes.deleteTodo
);

module.exports = app;
