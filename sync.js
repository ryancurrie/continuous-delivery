require('dotenv/config')

module.exports = {
  proxy: {
    target: 'localhost:' + process.env.PORT
  },
  port: process.env.SYNC_PORT,
  files: 'server/public/',
  reloadDelay: 1000
}
