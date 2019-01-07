# mock-api

An API that mocks our api services

---

## Installation and use

This repository is meant to be run within the [podium-local](https://github.com/soulcycle/podium-local) application environment. It contains a `local-init` setup script (see [this README section](https://github.com/soulcycle/podium-local#application-initialization-and-the-local-init-script) for more information on how this works) that handles installing node modules, spinning up docker-compose containers, and setting up a local aggregate database in the shared Podium PostgreSQL database container.

To update npm packages we should ensure that we run our installs through our docker container.

```bash
docker-compose run mock-api npm install
```

## Testing

Testing for this repo uses a combination of [Mocha](https://mochajs.org/), [Sinon](http://sinonjs.org/), and [Chai](http://chaijs.com/).

### Docker-based testing

Running tests within the docker container is the recommended way to test this repository's code. It helps ensure that parity with assets built by CI tools is maintained.

To run the tests within the service's container, you can use the command:

```bash
docker-compose run mock-api npm test
```

## Configuration

Configuration for this application uses a combination of configuration files and environment variables. A sample configuration file (`config/config.example.js`) is provided and will be used as a template when no user-defined configuration file (`config/config.js`) is found.

NOTE: When running the application in a Docker container locally with `docker-compose`, no user-defined configuration file should be necessary.

## Available configuration variables

| Name | Description | Default Value | Required |
| ---- | ----------- | ------------- | -------- |
| **Application** | | | |
| `MOCK_API_BACKEND_NAME` | The name of the application | Series Generator Backend | no |
| `MOCK_API_BACKEND_ENV` | The environment the application is running in | development | no |
| `MOCK_API_BACKEND_PORT` | The port that the application accepts requests on | 3141 | no |
| `MOCK_API_BACKEND_RELEASE_VERSION` | The current release of the application | none | no |
| `MOCK_API_BACKEND_MAX_REQUEST_BODY` | The maximum request body size | '5mb' | no |
