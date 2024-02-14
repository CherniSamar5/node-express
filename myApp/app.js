
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');


app.get('/', (req, res) => {
  res.sendFile("./views/home.html", {root:__dirname });
})



mongoose.connect("mongodb+srv://chernisamar:samar13653110@cluster0.pb5mryo.mongodb.net/?retryWrites=true&w=majority")
.then(() => { 
  app.listen(port, () => {

    console.log(`http://localhost:${port}/`)
  })
})
.catch((err) => {console.log(err)})

