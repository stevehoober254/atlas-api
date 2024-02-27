const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  
  let authHeader = req.headers.Authorization || req.headers.authorization;
  
  if ( !authHeader.startsWith("Bearer")){
    return res.status(401).json({message: "Unauthrized"})
  }

  
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({message: "User is not authorized or token is missing"});
      
      
    }
    jwt.verify(token, 
      process.env.ACCESS_TOKEN_SECERT,
       (err, decoded) => {
      if (err) {
        return res.status(403).json({message:"Forbiden"});
        
      }
      req.user = decoded.user;
      next();
    });

    
  }else{
    res.status(400).json({message:"Confirm the Authorization Token Syntax" })
    
  }
});

module.exports = {validateToken};