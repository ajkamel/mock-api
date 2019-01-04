const express = require('express');
const drakov = require('drakov');

const { drakovMiddleware, requestUtils } = drakov;

const argv = {
  sourceFiles: './docs/backrow.apib',
  serverPort: 3000,
  method: ['PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

const app = express();
app.use(requestUtils.getBody);

drakovMiddleware.init(app, argv, (err, middlewareFunction) => {
  if (err) {
    throw err;
  }

  app.use(middlewareFunction);
  app.listen(argv.serverPort);
});
