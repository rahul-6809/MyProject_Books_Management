const userModel=require('../models/UserModels')
const isValid =require('../validate/validation')
const validator = require('validator')
const arrTitle = ['Mr', 'Mrs', 'Miss']
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config')


const userRegistration= async (req,res) =>{
    try{
     const {title ,name,phone,email,password,address}=req.body
   
     if(!isValid(title)||isValid(name)||isValid(phone)||isValid(email)||!isValid(password)||isValid(address)){
        return res.status(400).send({status:false,message:"Please provide a valid Input"})
    }
    

    if (!arrTitle.includes(title)) {
        return res.status(400).send({ status: false, message: `Provide a valid title that is titles ${arrTitle}` })
    }



    if(!validator.isEmail(email)){
        return res.status(400).send({status:false,message: "Please provide a valid Email"})
    }



    if(!validator.isMobilePhone(phone)){
       return res.status(400).send({status:false,message: "please provide a valid Phone number"})
    }

     const checkPhone= await userModel.findOne({phone: phone})
     if(checkPhone){
        res.status(400).send({status:false,message:"phone number already exists"})
     }



   if(!password.length>=8&&password.length<=15){
    return res.status(400).send({status:false,message: "Password must be at least 8 characters longed"})
   }


   const usercreate= await userModel.create({title,name,email,password,address})
   res.status(201).send({status:true,data:usercreate})


}catch(err){
        res.status(500).send({status:false,message:err.message});
    }
}




const  userLogin =async (req,res) => {

    try{
        const {email,password} = req.body
        if(!isValid(req.body)||!isValid(email)||!isValid(password)){
            return res.status(400).send({status:false, message:"Invalid email or password Or Inputed"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).send({status:false, message:"please enter a valid email"})
        }
        if(!password.length>=8&&password.length<=15){
            return res.status(400).send({status:false,message: "Password must be at least 8 characters longed"})
           }

        const findUser = await userModel.findOne({email: email,password: password})

        if(!findUser){
            return res.status(400).send({status:false, message:`${email} and ${password} does not exist`})
        }else{

            const  token = jwt.sign({userId:findUser._id},SECRET_KEY)
            res.status(200).send({status:true, data:'{token:token}'})
        
        }

    }catch(err){ res.status(500).send({status:false,message:err.message}); }
}


module.exports={userRegistration,userLogin}