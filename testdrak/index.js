const express = require('express')
const drakovMiddleware = require('drakov').middleware;
const requestUtils = require ('drakov').requestUtils;

var argv = {
    sourceFiles: './docs/backrow.apib',
    serverPort: 3000,
    method: ['PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

const app = express();
app.use(requestUtils.getBody);

drakovMiddleware.init(app, argv, function(err, middlewareFunction) {
    if (err) {
        throw err;
    }

    app.use(middlewareFunction);
    app.listen(argv.serverPort);
});
