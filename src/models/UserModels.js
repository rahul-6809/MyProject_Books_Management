// { 
//     title: {string, mandatory, enum[Mr, Mrs, Miss]},
//     name: {string, mandatory},
//     phone: {string, mandatory, unique},
//     email: {string, mandatory, valid email, unique}, 
//     password: {string, mandatory, minLen 8, maxLen 15},
//     address: {
//       street: {string},
//       city: {string},
//       pincode: {string}
//     },
//     createdAt: {timestamp},
//     updatedAt: {timestamp}
//   }

  const mongoose =require('mongoose')

  const userSchema = new mongoose.Schema({
    title:{
        typeof: string,
        required: true,
        enum: [Mr,Mrs, Miss]
    },
    name:{
        typeof: string,
        required: true  
    },
    phone:{
        typeof: string,
        required: true,
        unique: true

    },
     email:{
        typeof: string,
        required:true,
        unique: true
     },
     password:{
        typeof:string,
        required:true
     },
     address:{
        street:{
            typeof: string
        },
        city:{
            typeof: string
        },
        pincode:{
            typeof:string 
     }
    }
  },{timestamps: true})


  module.exports =mongoose.Model('User',userSchema)