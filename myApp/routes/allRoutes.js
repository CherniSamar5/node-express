var express = require('express');
var router = express.Router();

const User = require("../models/customerSchema")
var myRes = []
var moment = require('moment');


//Get request
router.get('/', (req, res) => {
    User.find()
    .then(result =>{
      myRes = result
      //console.log(myRes)
      res.render("index", {myRes : myRes , moment : moment})
  
  
    }).catch(err =>{
      console.log(err)
    })
  
  })
  
  

  
  /*router.get('/user/edit.html', (req, res) => {
    res.render("user/edit", {})
  
  })*/
  
  router.get('/edit/:id', (req, res) => {
    User.findById(req.params.id)
    .then((result)=>{
      //console.log(result)
      res.render("user/edit" ,{obj : result , moment : moment})
    }).catch((err) => {
      console.log(err)  
    })
  })
  
  
  /*router.get('/user/view.html', (req, res) => {
    res.render("user/view", {})
  
  })*/
  
  router.get('/view/:id', (req, res) => {
   
    User.findById(req.params.id)
    .then((result)=>{
      //console.log(result)
      res.render("user/view" ,{obj : result , moment : moment})
    }).catch((err) => {
      console.log(err)
    })
  
  })
  
  

  
  router.post('/search' , (req ,res)=>{
    User.find({$or: [ { firstName: { $regex: req.body.searchText.trim(), $options: 'i' } },
    { lastName: { $regex: req.body.searchText.trim(), $options: 'i' } }] })
    .then((result)=>{
    //console.log(result)
    res.render("user/search" ,{array : result , moment : moment})
    })
  })
  //delete request
  router.delete("/edit/:id", (req, res) => {
    //User.findByIdAndDelete(req.params.id)
    User.deleteOne({_id : req.params.id})
    .then(()=>{
      res.redirect("/")
    })
    .catch((err)=>{
      console.log(err)
    })
  }); 
  
  //put request
  router.put("/edit/:id" ,(req, res) => {
    //  User.findByIdAndUpdate(req.params.id , req.body)
    User.updateOne({_id : req.params.id} , req.body)
    .then(()=>{
      res.redirect("/")
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  

  module.exports = router;
