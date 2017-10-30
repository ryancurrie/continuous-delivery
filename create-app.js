const express = require('express')
const todoGateway = require('./todo-gateway')

module.exports = function createApp(db) {
  const app = express()
  const todos = todoGateway(db.collection('todos'))

  app.get('/', (req, res) => {
    res.status(200).json({
      name: 'continuous-delivery',
      description: 'A practice repository for testing and deployment.',
      url: 'https://github.com/ryancurrie/continuous-delivery'
    })
  })

  app.get('/todos', async (req, res) => {
    const list = await todos.find()
    res.status(200).json(list)
  })

  return app
}
