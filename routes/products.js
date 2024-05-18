const express=require('express')
const routes=express.Router()
const User=require('../models/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()
const auth = require('../middleware/auth');
const productController=require('../controllers/productController');


routes.post('/product',auth,productController.addProduct);
routes.get('/product', auth,productController.listProduct)



