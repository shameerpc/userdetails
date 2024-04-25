const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    const token=req.headers.autherization?.split(' ')[1];
    if(!token){
        return res.status(401).json('access denied no token provided')
    }
    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
       return res.status(401).json('Invalid token');
    }
}