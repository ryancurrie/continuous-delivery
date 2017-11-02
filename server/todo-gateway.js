const uuid = require('uuid/v4')

module.exports = function todoGateway(collection) {
  return {
    async find() {
      return collection.find().toArray()
    },
    async create(newTodo) {
      const todo = Object.assign({ id: uuid() }, newTodo)
      await collection.insertOne(todo)
      return todo
    }
  }
}
