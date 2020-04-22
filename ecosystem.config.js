module.exports = {
  apps: [
    {
      name: 'weixin-server',
      script: 'app.js',
      error_file: 'logs/pm2/err.log',
      out_file: 'logs/pm2/out.log',
      log_file: 'logs/pm2/combined.log',
      time: true,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
