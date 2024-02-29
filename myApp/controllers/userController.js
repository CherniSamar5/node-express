const User = require("../models/customerSchema")
var moment = require('moment')
var myRes = []
 

const user_index_get = (req, res) => {
    User.find()
    .then(result =>{
      myRes = result
      //console.log(myRes)
      res.render("index", {myRes : myRes , moment : moment})
  
  
    }).catch(err =>{
      console.log(err)
    })
  
  }

const user_edit_get = (req, res) => {
    User.findById(req.params.id)
    .then((result)=>{
      //console.log(result)
      res.render("user/edit" ,{obj : result , moment : moment})
    }).catch((err) => {
      console.log(err)  
    })
  }

const user_view_get = (req, res) => {
   
    User.findById(req.params.id)
    .then((result)=>{
      //console.log(result)
      res.render("user/view" ,{obj : result , moment : moment})
    }).catch((err) => {
      console.log(err)
    })
  
  }

const user_search_post = (req ,res)=>{
    User.find({$or: [ { firstName: { $regex: req.body.searchText.trim(), $options: 'i' } },
    { lastName: { $regex: req.body.searchText.trim(), $options: 'i' } }] })
    .then((result)=>{
    //console.log(result)
    res.render("user/search" ,{array : result , moment : moment})
    })
  }

const user_delete = (req, res) => {
    //User.findByIdAndDelete(req.params.id)
    User.deleteOne({_id : req.params.id})
    .then(()=>{
      res.redirect("/")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

const user_put = (req, res) => {
    //  User.findByIdAndUpdate(req.params.id , req.body)
    User.updateOne({_id : req.params.id} , req.body)
    .then(()=>{
      res.redirect("/")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

const user_add_get = (req, res) => {
res.render("user/add", {})

}

const user_add_post =  (req, res) => {
    //console.log(req.body)
    User.create(req.body)
    .then(() => {
        res.redirect("/")
    })
    .catch(error => {
        console.log(error)
    })
    
    }
module.exports = {user_index_get , user_edit_get , user_view_get , user_search_post , user_delete , user_put , user_add_get,user_add_post }