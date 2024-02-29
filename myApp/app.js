
const express = require('express')
const app = express()
const port = process.env || 3001
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const { error } = require('console');
app.use(express.static('public'))
app.set('view engine', 'ejs')
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

var allRoutes = require('./routes/allRoutes');
var addRoutes = require('./routes/addRoutes');



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




//Connect dataBase
mongoose.connect("mongodb+srv://chernisamar:samar13653110@cluster0.pb5mryo.mongodb.net/all-data?retryWrites=true&w=majority")
  .then(() => {
    app.listen(port, () => {

      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) })


  app.use(allRoutes);
  app.use('/user',addRoutes)
