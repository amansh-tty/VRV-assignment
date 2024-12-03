const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) =>{
    let token 
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith('Bearer ')){
        token = authHeader.split(' ')[1]
        if(!token)
        {
            return res.status(401).json({message:"No token, authorization denied"})
        }
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = jwt.decode
            console.log("The decoded User ",req.user)
            next()
        }
        catch(err){
            return res.status(400).json({message:"Token isn't valid"})
        }

        }
        else{
            return res.status(401).json({message : "No token, authorization denied"})
        }
}

module.exports = verifyToken
