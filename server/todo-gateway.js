module.exports = function todoGateway(collection) {
  return {
    async find() {
      return collection.find().toArray()
    }
  }
}
