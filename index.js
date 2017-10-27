const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'continuous-delivery',
    description: 'A practice repository for testing and deployment.'
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
