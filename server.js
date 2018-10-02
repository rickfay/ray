
const port = 8080;
const connect = require('connect');
const serveStatic = require('serve-static');
const app = connect();

app.use(serveStatic("./"), null);
app.listen(port);
console.log(`Listening on Port ${port}...`);