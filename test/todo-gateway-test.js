require('dotenv').config()
const { describe, before, beforeEach, after, it } = require('mocha')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const uuid = require('uuid/v4')
const todoGateway = require('../server/todo-gateway')

describe('Todo app', () => {
  let db
  let todos
  let collection
  const testId = uuid()

  before(done => {
    MongoClient.connect(process.env.MONGODB_URI, (err, _db) => {
      if (err) {
        done(err)
      }
      db = _db
      collection = db.collection('todos')
      todos = todoGateway(collection)
      done()
    })
  })

  beforeEach(async () => {
    await collection.deleteMany()
    await collection.insertOne({
      id: testId,
      task: 'test',
      dueDate: new Date()
    })
  })

  after(done => {
    db.close(() => done())
  })

  describe('Find', () => {
    it('should return a list of a todos', async () => {
      const found = await todos.find({ id: testId })
      expect(found).to.be.an('array')
    })
  })

  describe('Add todo', () => {
    const test = { id: uuid(), task: 'test', dueDate: new Date() }

    it('should create a new todo in the database, and return it', async () => {
      const save = await todos.add(test)
      expect(save)
        .to.be.an('object')
        .that.has.property('task', 'test')
    })
  })
})
