
var express = require('express');
var router = express.Router();

const User = require("../models/customerSchema")




//Get request
router.get('/add.html', (req, res) => {
    res.render("user/add", {})
  
  })



//Post request 
router.post('/add.html', (req, res) => {
    //console.log(req.body)
    User.create(req.body)
    .then(() => {
        res.redirect("/")
    })
    .catch(error => {
        console.log(error)
    })
    
    })


module.exports = router;
