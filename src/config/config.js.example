const config = {
  application: {
    env: process.env.MOCK_API_ENV || 'development',
    max_request_body: process.env.MOCK_API_MAX_REQUEST_BODY || '5mb',
    name: process.env.MOCK_API_NAME || 'Mock API',
    port: parseInt(process.env.MOCK_API_PORT || 3000, 10),
    release_version: process.env.MOCK_API_RELEASE_VERSION || '',
    start_time: Date.now(),
  },
  drakovOptions: {
    sourceFiles: './blueprints/*.apib',
    serverPort: parseInt(process.env.MOCK_API_PORT || 3000, 10),
    method: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    debugMode: false,
    stealthmode: false,
    disableCORS: false,
    discover: false,
    watch: false,
  },
};

module.exports = config;
