const express = require('express');
const router = express.Router();
const _ = require("underscore");
const cors = require("cors");

const cntlSignup=require('../controllers/signup');
const cntlLogin=require('../controllers/login');
const SignUpUsers = new cntlSignup("SignUp Controller");
const SignInUsers = new cntlLogin("Login Controller");

// routes  
router.post("/add-user", cors(), _.bind(SignUpUsers.addUser, SignUpUsers));
router.post('/login',cors(), _.bind(SignInUsers.authenticateUser, SignInUsers));


module.exports = router;
