import bodyParser from 'body-parser';
import express from 'express';

// import config from './helpers/config_helper';
import routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Set up routes
Object.keys(routes).forEach((route) => {
  app.use(`/${route}`, require(`${routes[route]}`).default);
});

// Handle 404s
// Commented out because this conflicts with Drakov
// app.use((req, res) => errorController.notFound(req, res));

export default app;
