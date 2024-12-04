const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000

let isConnected = false;
mongoose.connect("mongodb://mongo:27017/test", {})
  .then(() => isConnected = true)

app.get('/', (req, res) => {
  res.send('Hello World! ' + isConnected)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
