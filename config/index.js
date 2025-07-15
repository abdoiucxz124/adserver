module.exports = {
  development: {
    port: process.env.PORT || 3000,
    logLevel: 'debug',
    rateLimit: {
      windowMs: 60 * 1000, // 1 minute
      max: 100 // requests per windowMs
    }
  },
  production: {
    port: process.env.PORT || 3000,
    logLevel: 'error',
    rateLimit: {
      windowMs: 60 * 1000, // 1 minute
      max: 50 // requests per windowMs
    }
  },
  test: {
    port: 3001,
    logLevel: 'error',
    rateLimit: {
      windowMs: 60 * 1000,
      max: 200
    }
  }
};