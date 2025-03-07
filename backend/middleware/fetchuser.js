var jwt = require("jsonwebtoken");
const JWT_SECRET = "Aadilisgoodb@&%oy";

const fetchuser=(req,res,next)=>{
    //get user from jwt token and add id to req object
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }
    try{
        const data= jwt.verify(token,JWT_SECRET)
        req.user=data.user
    }
    catch(error){
        res.status(401).send({error:"please authenticate using valid token"})
    }
    next()
}





module.exports = fetchuser;
