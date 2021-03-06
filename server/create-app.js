const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const todoGateway = require('../server/todo-gateway')

module.exports = function createApp(db) {
  const app = express()
  const jsonParser = bodyParser.json()
  const todos = todoGateway(db.collection('todos'))

  const publicPath = path.join(__dirname, 'public')
  const staticMiddleware = express.static(publicPath)

  app.use(staticMiddleware)

  app.get('/api', (req, res) => {
    res.status(200).json({
      name: 'continuous-delivery',
      description: 'A practice repository for testing and deployment.',
      url: 'https://github.com/ryancurrie/continuous-delivery'
    })
  })

  app.get('/api/todos', async (req, res) => {
    const list = await todos.find()
    res.status(200).json(list)
  })

  app.post('/api/create', jsonParser, async (req, res) => {
    const created = await todos.create(req.body)
    res.status(201).json(created)
  })

  return app
}
