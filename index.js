const httpPort = process.env.HTTP_PORT || 3000
const express = require('express')
const app = express()

app.listen(httpPort, function () {
  console.log(`Generic explorer listening on port ${httpPort}!`)
})
