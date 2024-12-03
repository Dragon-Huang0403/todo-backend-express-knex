const app = require('./server.js');

const port = process.env.PORT || 5000;

function main() {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

main();
