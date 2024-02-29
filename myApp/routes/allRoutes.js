var express = require('express');
var router = express.Router();

const User = require("../models/customerSchema")
var myRes = []
var moment = require('moment');
var userController = require('../controllers/userController');


//Get request
router.get('/', userController.user_index_get)
  
  

  
  /*router.get('/user/edit.html', (req, res) => {
    res.render("user/edit", {})
  
  })*/
  
  router.get('/edit/:id', userController.user_edit_get)
  
  
  /*router.get('/user/view.html', (req, res) => {
    res.render("user/view", {})
  
  })*/
  
  router.get('/view/:id', userController.user_view_get)
  
  

  
  router.post('/search' ,userController.user_search_post )
  //delete request
  router.delete("/edit/:id", userController.user_delete); 
  
  //put request
  router.put("/edit/:id" ,userController.user_put)
  

  module.exports = router;
