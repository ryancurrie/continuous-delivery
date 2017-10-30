require('dotenv').config()
const createApp = require('./create-app')
const { MongoClient } = require('mongodb')

MongoClient.connect(process.env.DEV_DB, (err, db) => {
  if (err) {
    console.error(err)
    porcess.exit(1)
  }

  const app = createApp(db)

  app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT)
  })
})
