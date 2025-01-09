const jwt=require('jsonwebtoken');
const JWT_SECRET='ayushisgoodb$oy';

const fetchuser=(req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({msg:'No token, authorization denied'})
    }

    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(error){
        // console.error(error.message)
        res.status(401).json({error:'Token is not valid'})
    }
}

module.exports=fetchuser;
