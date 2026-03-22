const jwt = require('jsonwebtoken')

const protect=(req,res,next)=>{
    const authheader = req.headers.authorization;

    if (!authheader) {
        return res.status(401).json({ msg: "no token, unauthorized" })
    }
    const token = authheader.split(' ')[1];
    try{
        //decoded = the data  originally stored in the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //attaching data to the request object..creating a new property on the request object.
        req.user =decoded;
        next();
    }
    catch{
        return res.status(401).json({msg:"invalid token"})
    }


}
module.exports = protect