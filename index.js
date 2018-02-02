const httpPort = process.env.HTTP_PORT || 3000
const express = require('express')
const app = express()

app.use('/data',express.static('data.json'))
app.use(express.static('static'))
app.use(express.static('generated'))
app.get('*',(req,res)=>{
  res.sendFile(`${__dirname}/static/index.html`)
})

app.listen(httpPort, function () {
  console.log(`Generic explorer listening on port ${httpPort}!`)
})
