
var express = require('express');
var router = express.Router();

const User = require("../models/customerSchema")
var userController = require('../controllers/userController');




//Get request
router.get('/add.html', userController.user_add_get  )



//Post request 
router.post('/add.html', userController.user_add_post)


module.exports = router;
