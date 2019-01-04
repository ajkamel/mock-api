const config = {
  application: {
    env: process.env.MOCK_API_ENV || 'development',
    max_request_body: process.env.MOCK_API_MAX_REQUEST_BODY || '5mb',
    name: process.env.MOCK_API_NAME || 'Mock API',
    port: parseInt(process.env.MOCK_API_PORT || 3000, 10),
    release_version: process.env.MOCK_API_RELEASE_VERSION || '',
    start_time: Date.now(),
  },
};

module.exports = config;
