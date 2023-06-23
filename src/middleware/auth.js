const {SECRET_KEY}= require('../../config')
const jwt = require('jsonwebtoken')
const bookModel =require('../models/BooksModels')
const {isValidObject}=require('mongoose')


const  UserAuthenticate=async( req,res,next)=>{ 
    try{ 
const token =req.headers[`x-api-key`]
if(!token){
    return res.status(404) .send({status: false, message: 'Provide credentials headers token'})
}
const decodedToken= jwt.verify(token,SECRET_KEY)
req.userId = decodedToken.userId
next();
}


catch(err){
     if(err.message.includes("signature")|| err.message.includes("token") || err.message.includes("malformed")) {
    return res.status(403).send({ status: false, message: "You are not Authenticated" })
} res.status(400).send({status:false,message:err.message})
}
}





const UserAuthorization = async function (req, res, next) {
    try {
        let tokenId = req.userId;
        let bookId = req.params.bookId || req.query.bookId;

        if (!isValidObject(bookId)) return res.status(400).send({ status: false, message: `Book id ${bookId} is invalid` })

        const findUser = await bookModel.findOne({ _id: bookId });
        if (!findUser) return res.status(404).send({ status: false, message: 'User not found' })
        const { userId } = findUser;

        if (tokenId.toString() !== userId.toString()) return res.status(403).send({ status: false, message: "Unauthorized, cannot access other's data." })
        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports={  UserAuthenticate,UserAuthorization}