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
        type:ObjectId,
        required:true,
        ref:'Books'
    },
    reviewedBy:{
        type:String,
        required:true,
        default:'Guest',
        value: true
    },
    reviewedAt:{
        type:Date,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
  },{timestaps:true})


  module.exports=mongoose.model('Review',reviewSchema)