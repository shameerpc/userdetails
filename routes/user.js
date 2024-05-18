const express=require('express')
const routes=express.Router()
const User=require('../models/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()
const auth = require('../middleware/auth');
const userController=require('../controllers/userController');



routes.post('/signup',auth,userController.registration)

routes.post('/login',auth,userController.login)

routes.get('/user-details',auth,async(req,res)=>{
     try {
          const user=await User.findById(req.userId)
          if(user){
               return res.status(400).json({status:400,messege:"no user available"})
          }
 
             res.status(200).json({ status:200,data:user });


     } catch (error) {
          return res.status(500).json({status:500,messege:'Error fetching user details'})
     }
})




module.exports=routes;





