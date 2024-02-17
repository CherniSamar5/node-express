
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const myData = require("./models/mydataSchema")
var myRes

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render("index", {})

})




mongoose.connect("mongodb+srv://chernisamar:samar13653110@cluster0.pb5mryo.mongodb.net/all-data?retryWrites=true&w=majority")
  .then(() => {
    app.listen(port, () => {

      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) })



app.post('/', (req, res) => {
  //console.log(req.body)
  //res.redirect("/")

  const mydata = new myData(req.body)

  mydata.save().then(result => {
    res.redirect("/")
  }).catch(err => {
    console.log(err)
  })


})


// to reload the page 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});