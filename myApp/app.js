
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema")
var myRes = []
app.use(express.static('public'))
app.set('view engine', 'ejs')
var moment = require('moment');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

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




//Get request
app.get('/', (req, res) => {
  User.find()
  .then(result =>{
    myRes = result
    //console.log(myRes)
    res.render("index", {myRes : myRes , moment : moment})


  }).catch(err =>{
    console.log(err)
  })

})


app.get('/user/add.html', (req, res) => {
  res.render("user/add", {})

})

/*app.get('/user/edit.html', (req, res) => {
  res.render("user/edit", {})

})*/

app.get('/edit/:id', (req, res) => {
  User.findById(req.params.id)
  .then((result)=>{
    //console.log(result)
    res.render("user/edit" ,{obj : result , moment : moment})
  }).catch((err) => {
    console.log(err)  
  })
})


/*app.get('/user/view.html', (req, res) => {
  res.render("user/view", {})

})*/

app.get('/view/:id', (req, res) => {
 
  User.findById(req.params.id)
  .then((result)=>{
    //console.log(result)
    res.render("user/view" ,{obj : result , moment : moment})
  }).catch((err) => {
    console.log(err)
  })

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

//delete request
app.delete("/edit/:id", (req, res) => {
  //User.findByIdAndDelete(req.params.id)
  User.deleteOne({_id : req.params.id})
  .then(()=>{
    res.redirect("/")
  })
  .catch((err)=>{
    console.log(err)
  })
}); 


//Connect dataBase
mongoose.connect("mongodb+srv://chernisamar:samar13653110@cluster0.pb5mryo.mongodb.net/all-data?retryWrites=true&w=majority")
  .then(() => {
    app.listen(port, () => {

      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) })


