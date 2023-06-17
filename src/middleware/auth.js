const {SECRET_KEY}= require('../../config')
const jwt = require('jsonwebtoken')
const userModel=require('../models/UserModels')
const {isValidObject}=require('mongoose')


const authorizationFuc=async( req,res)=>{ 
    try{ 
const token =req.headers[`x-api-key`]
if(!token){
    return res.status(404) .send({status: false, message: 'Provide credentials headers token'})
}
const decoded= jwt.verify(token,SECRET_KEY)
req.userId = decodedToken.userId
next();
}


catch(err){
     if(err.message.includes("signature")|| err.message.includes("token") || err.message.includes("malformed")) {
    return res.status(403).send({ status: false, message: "You are not Authenticated" })
} res.status(400).send({status:false,message:err.message})
}
}

module.exports={authorizationFuc}