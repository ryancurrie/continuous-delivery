const express = require('express')

module.exports = function createApp() {
  const app = express()

  app.get('/', (req, res) => {
    res.status(200).json({
      name: 'continuous-delivery',
      description: 'A practice repository for testing and deployment.'
    })
  })

  return app
}
