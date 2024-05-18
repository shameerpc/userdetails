const User=require('../models/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()




exports.registration = async(req,res)=>{
    try {
         
  
    const {username,password}=req.body

    const userExist=await User.findOne({username})
    if(userExist){
         return res.status(400).json({status:400,messege:"invalid credentials"})
    }
  
    const hashPassword=await bcrypt.hash(password,10)
    const user = new User({ username, password: hashPassword });
   await user.save();
     res.status(200).json({status:200,messege:'user created successfully' });
    } catch (error) {
         console.log(error)
         res.status(500).json({status:500,messege:'error signup' });
    }

    
}


exports.login = async(req,res)=>{
    try {
         const {username,password}=req.body
         console.log(username)
         const userExist=await User.findOne({username})
         console.log(userExist)
         if(userExist){
              return res.status(400).json({status:400,messege:"invalid credentials"})
         }
         const checkPassword=bcrypt.compare(password,userExist.password)
         if(checkPassword){
              const token = jwt.sign({ userId: userExist._id }, 'secret', { expiresIn: '1h' });
          
            res.json({ token });
         }else{
              return res.status(400).json({status:400,messege:"invalid credentials"})
         }


    } catch (error) {
         return res.status(500).json({status:500,messege:'Error logging in'})
    }
}