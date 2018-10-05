const PORT = 8080;

const connect = require("connect");
const serveStatic = require("serve-static");

const app = connect();
app.use(serveStatic("./"), null);
app.listen(PORT);

console.log(`Listening on Port ${PORT}...`);