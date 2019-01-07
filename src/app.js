import bodyParser from 'body-parser';
import express from 'express';

// import config from './helpers/config_helper';
import routes from './routes';

const app = express();

// app.set('port', config.application.port);
// app.use(bodyParser.json({ limit: config.application.max_request_body }));
app.use(bodyParser.urlencoded({ extended: false }));

// // Set up cors middleware
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin, X-Requested-With');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

// Set up routes
Object.keys(routes).forEach((route) => {
  app.use(`/${route}`, require(`${routes[route]}`).default);
});

// Handle 404s
// app.use((req, res) => errorController.notFound(req, res));

export default app;
