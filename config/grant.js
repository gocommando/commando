const config = {
  server: {
    protocol: (process.env.PROTOCOL || 'http'),
    host: (process.env.HOST || 'localhost:3000'),
    state: true
  }
};

if (process.env.GITHUB_CLIENT_ID) {
  config.github = {
    key: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_SECRET,
    callback: '/auth/github'
  };
}

module.exports = config;
