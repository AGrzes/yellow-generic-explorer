const httpPort = process.env.HTTP_PORT || 3000
const express = require('express')
const app = express()
const open = require('opn')
app.use('/data',express.static('data.json'))
app.use(express.static('static'))
app.use(express.static('generated'))
app.get('*',(req,res)=>{
  res.sendFile(`${__dirname}/static/index.html`)
})

const util = require('util')
const server = app.listen(0,'0.0.0.0',function () {
  const address = server.address()
  const url = `http://${address.address}:${address.port}`
  console.log(`Generic explorer available on ${url}!`)
  open(url)
})
