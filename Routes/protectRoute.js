const {JWT_Key} = require("../config");
const jwt=require('jsonwebtoken');


function protectRoute(req,res,next){
    try{
        if(req.cookies.login){
            console.log(req.cookies);
            let isVerified=jwt.verify(req.cookies.login,JWT_Key);
            if(isVerified){
                next();
            }
            else{
                res.json({
                    message:"not authorized"
                });
            }
        }
        else{
            res.json({
                message:"operation not allowed"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports=protectRoute;