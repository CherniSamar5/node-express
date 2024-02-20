
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema")
var myRes = []

app.use(express.static('public'))

app.set('view engine', 'ejs')


//Get request
app.get('/', (req, res) => {
  User.find().then(result =>{
    myRes = result
    //console.log(myRes)

  }).catch(err =>{
    console.log(err)
  })
  res.render("index", {myRes : myRes})

})

app.get('/user/add.html', (req, res) => {
  res.render("user/add", {})

})

app.get('/user/edit.html', (req, res) => {
  res.render("user/edit", {})

})

app.get('/user/view.html', (req, res) => {
  res.render("user/view", {})

})

//Post request 
app.post('/user/add.html', (req, res) => {
  //console.log(req.body)
  const user = new User(req.body)
  user.save()
  .then(() => {
    res.redirect("/")
  })
  .catch(error => {
    console.log(error)
  })

})



//Connect dataBase
mongoose.connect("mongodb+srv://chernisamar:samar13653110@cluster0.pb5mryo.mongodb.net/all-data?retryWrites=true&w=majority")
  .then(() => {
    app.listen(port, () => {

      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) })


// to reload the page 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
const { error } = require('console');
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


app.get('/user/:id', (req, res) => {
 
  User.findById(req.params.id)
  .then((result)=>{
    //console.log(result)
    res.render("user/view" ,{obj : result})
  }).catch((err) => {
    console.log(err)
  })

})
 