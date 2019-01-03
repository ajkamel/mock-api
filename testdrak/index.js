const express = require('express')
const drakovMiddleware = require('drakov').middleware;

var argv = {
    sourceFiles: './docs/*.apib',
    serverPort: 3000,
    method: [], 
    stealthmode: true,
};

const app = express();
drakovMiddleware.init(app, argv, function(err, middlewareFunction) {
    if (err) {
        throw err;
    }

    app.use(middlewareFunction);
    app.listen(argv.serverPort);
});