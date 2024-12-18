const userRoutes = require('./users.js');
const authRoutes = require('./auth.js');
const orgRoutes = require('./organizations.js');
const todoRoutes = require('./todos.js');

function addErrorReporting(name, func) {
  return async function (req, res) {
    try {
      return await func(req, res);
    } catch (err) {
      console.log(`${name} caused by: ${err}`);

      // Not always 500, but for simplicity's sake.
      res.status(500).send(`Opps! ${name}.`);
    }
  };
}

const toExport = {
  createUser: userRoutes.createUser(),
  authUserLogin: authRoutes.authUserLogin(),
  createOrganization: orgRoutes.createOrganization(),
  listOrganizations: orgRoutes.listOrganizations(),
  createJoinOrgInvitation: orgRoutes.createJoinOrgInvitation(),
  acceptInvitation: orgRoutes.acceptInvitation(),
  createTodo: todoRoutes.createTodo(),
  getTodo: todoRoutes.getTodo(),
  listTodos: todoRoutes.listTodos(),
  updateTodo: todoRoutes.updateTodo(),
  deleteTodo: todoRoutes.deleteTodo(),
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(route, toExport[route]);
}

module.exports = toExport;
