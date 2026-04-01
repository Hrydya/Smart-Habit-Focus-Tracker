const jwt = require('jsonwebtoken')

const protect=(req,res,next)=>{
    const authheader = req.headers.authorization;

    if (!authheader) {
        return res.status(401).json({ msg: "no token, unauthorized" })
    }
    const token = authheader.split(' ')[1];
    try{
//decoded = the data  originally stored in the token i.e. the id 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
//attaching only payload(not header not signature only payload out of token = header.payload.signature) to the request object..creating a new property on the request object.
        req.user =decoded; 
        next();
    }
    catch{
        return res.status(401).json({msg:"invalid token"})
    }
}
module.exports = protect


//jwt.verify checks:
// Is the token valid ?
// Was it signed using your secret key (process.env.JWT_SECRET) ?
//If valid → returns the payload stored in the token.Usually, this includes user info like id or email.

// req is the request object on the server, not the client
// When a client(browser, Postman, app) sends a request, Node / Express creates a request object(req) to represent that incoming request.
// This object has info like:
// req.body → the data sent in POST / PUT
// req.headers → headers like Authorization
// req.params → URL parameters
// req.query → query strings

// Think of req as a copy of the request that the server handles internally.

// 2️⃣ Server can add properties to req
// req is just a JavaScript object on the server.
// You can attach any property to it.