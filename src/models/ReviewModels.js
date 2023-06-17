// {
//     bookId: {ObjectId, mandatory, refs to book model},
//     reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
//     reviewedAt: {Date, mandatory},
//     rating: {number, min 1, max 5, mandatory},
//     review: {string, optional}
//     isDeleted: {boolean, default: false},
//   }


  const mongoose = require('mongoose')

  const ObjectId= mongoose.Schema.Types.ObjectId

  const reviewSchema = new mongoose.Schema({
    bookId:{
        typeof:ObjectId,
        required:true,
        ref:'Books'
    },
    reviewedBy:{
        typeof:string,
        required:true,
        default:'Guest',
        value: true
    },
    reviewedAt:{
        typeof:Date,
        required:true
    },
    rating:{
        typeof:number,
        required:true
    },
    review:{
        typeof:string
    },
    isDeleted:{
        typeof:boolean,
        default:false
    }
  },{timestaps:true})


  module.exports=mongoose.model('Review',reviewSchema)