require('dotenv').config()
const { describe, before, beforeEach, after, it } = require('mocha')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const todoGateway = require('../todo-gateway')

describe('Todo app', () => {
  let db
  let todos
  let collection

  before(done => {
    MongoClient.connect(process.env.DEV_DB, (err, _db) => {
      if (err) {
        done(err)
      }
      db = _db
      collection = db.collection('todos')
      todos = todoGateway(collection)
      done()
    })
  })

  after(done => {
    db.close(() => done())
  })

  describe('Find', () => {
    it('should return a list of a todos', async () => {
      const found = await todos.find()
      expect(found).to.be.an('array')
    })
  })
})
