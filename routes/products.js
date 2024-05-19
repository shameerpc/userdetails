const express=require('express')
const routes=express.Router()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()
const auth = require('../middleware/auth');
const productController=require('../controllers/productController');


routes.post('/',auth,productController.addProduct);
routes.get('/', auth,productController.listProduct)


module.exports=routes;
