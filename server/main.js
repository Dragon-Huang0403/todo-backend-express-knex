const app = require('./server.js');
const config = require('./config/config.js');

function main() {
  app.listen(config.PORT, () =>
    console.log(`Listening on port ${config.PORT}`)
  );
}

main();
