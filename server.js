const express = require('express');
const bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH,');
  res.header('Access-Control-Expose-Headers', 'x-auth');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-auth');
  next();
});
app.use(require('./routes/jobs'));

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = {app};
