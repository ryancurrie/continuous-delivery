module.exports = function todoGateway(collection) {
  return {
    async find() {
      return collection.find().toArray()
    },
    async add(newTodo) {
      await collection.insertOne(newTodo)
      return newTodo
    }
  }
}
