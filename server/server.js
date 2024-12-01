const app = require('./server-config.js');
const routes = require('./routes/index.js');

const port = process.env.PORT || 5000;

app.post('/v1/users', routes.createUser);
app.post('/v1/auth/login', routes.authUserLogin);
app.post('/v1/organizations', routes.createOrganization);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
