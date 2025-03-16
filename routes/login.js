const express = require('express');
const router = express.Router();
const LoginService = require('../services/LoginService');
const UserModel = require('../repositories/models/userModel');
const ApiError = require('../utils/errorHandler');
const userModel = new UserModel();
const loginService = new LoginService(userModel);
router.post('/', async function(req, res, next) {
  console.log(req.body);
  const response = await loginService.login(req.body.data.email, req.body.data.password);
  console.log(`response: ${response}`);
  if(response === false) {
    console.log('Invalid credentials');    
    next(new ApiError(400,'BROKEN'));
  }else 
  {
  res.cookie('token', response);
  res.status(200).send({message: 'Login successful'});
  }
});

module.exports= router;
