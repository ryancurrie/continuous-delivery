require('dotenv').config()
const createApp = require('../server/create-app')
const { MongoClient } = require('mongodb')

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const app = createApp(db)

  app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT)
  })
})
