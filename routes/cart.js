const express=require('express')
const routes=express.Router()
const User=require('../models/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()
const auth = require('../middleware/auth');
const cartController=require('../controllers/cartController');


routes.post('/cart',auth,cartController.addCart);
routes.get('/cart', auth,cartController.listCart)
routes.post('/cart',auth,cartController.updateCart);
routes.get('/cart', auth,cartController.deleteCart);


module.exports=routes;
