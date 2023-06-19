const bookModel= require('../models/BooksModels.js')
const {isValid, isValidDate, isValidRequestBody,isValidName,isValidObjectId}=require('../validate/validation')
const validator=require('validator')
const reviewModel=require('../models/ReviewModels.js')



const createReview = async(req,res)=>{

    try{
     const data =req.body
     if(!isValid(data)){ return res.status(400).send({status:false,message:'Data required'}) }
     data["reviewedAt"] = new Date();

     const bookId= req.params.bookId
     if(!isValidObjectId(bookId)){ return res.status(400).send({status:false,message:'provide valid bookId'}) }


if(data.reviewedBy==" "){
    return res.status(400).send({status:false,message:'provide review'})
}else if(data.reviewedBy){
    if(!isValidName(data.reviewedBy)){
        return res.status(400).send({status:false,message:'provide valid name'})
}
}
if (!isValid(data.rating)) { return res.status(400).send({ status: false, message: "Rating is required" }) }
        if (!(data.rating >= 1 && data.rating <= 5)) { return res.status(400).send({ status: false, message: "Rating value should be between 1 to 5" }) }

        //validating review
        if (data.review == "") { return res.status(400).send({ status: false, message: "Please provide valid review." }) }
        else if (data.review) {
            if (!isValid(data.review)) { return res.status(400).send({ status: false, message: "Please provide valid review." }) }
        }

        //finding book document & creating review
        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }
        let createData = await reviewModel.create(data)

        //updating review in book document    
        const updateReview = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: 1 } }, { new: true })

        //destructuring to get only required keys  
        const {_id,reviewedBy,reviewedAt,rating,review}= createData
        const reviewData = {_id,bookId,reviewedBy,reviewedAt,rating,review}

        const { title, excerpt, userId, category, reviews, subcategory, deletedAt, isDeleted, releasedAt, createdAt, updatedAt } = updateReview
        let details = { title, excerpt, userId, category, reviews, subcategory, deletedAt, isDeleted, releasedAt, createdAt, updatedAt }

        //sending updated review for book
        details["reviewData"] = reviewData
        return res.status(201).send({ status: true, message: "Success", data: details })



    }catch(err){ res.status(500).send({status:false,message:err.message});
}
}











const updateReview = async function (req, res) {
    try {

       //validating BookId(params)
       const bookId = req.params.bookId
       if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "book Id is not Valid" })

       //validating review Id(params)
       let reviewId = req.params.reviewId
       if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: " Invalid reviewId found" })

        //validating request body
        let reqBody = req.body;
       if (!isValidRequestBody(reqBody)) {
           return res.status(400).send({ status: false, message: "please enter data in body" })
       }

       //validating rating
       if(reqBody.rating==""){return res.status(400).send({ status: false, message: "Please provide valid rating."})}
       else if(reqBody.rating){
           if (!isValid(reqBody.rating)) { return res.status(400).send({ status: false, message: "Rating is required" }) }
           if (!(reqBody.rating >= 1 && reqBody.rating <= 5)) { return res.status(400).send({ status: false, message: "Rating value should be between 1 to 5" }) }
       }

       //validating reviewedBy
       if(reqBody.reviewedBy==""){return res.status(400).send({ status: false, message: "Please provide name."})} 
       else if(reqBody.reviewedBy){
           if(!isValidName(reqBody.reviewedBy)){return res.status(400).send({ status: false, message: "Please provide valid name."})}}

       //validating review
       if(reqBody.review==""){return res.status(400).send({ status: false, message: "Please provide valid review."})} 
       else if(reqBody.review){
           if(!isValid(reqBody.review)){return res.status(400).send({ status: false, message: "Please provide valid review."})}}

       //Finding Book by Id
       const checkBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
       if (!checkBook) {
           return res.status(404).send({ status: false, message: "Book not found" })
       }

       //Destructuring to get request Body Entries
       let { review, rating, reviewedBy } = reqBody
       let updateReview = { review, rating, reviewedBy }

       
       //Updating review by review Id
       const checkReview = await reviewModel.findOneAndUpdate({ _id: reviewId, isDeleted: false }, updateReview, { new: true })
       if (!checkReview) { return res.status(404).send({ status: false, message: "review not found" }) }

       //==Destructuring to get required keys only ==//   
       let destBook = {
           title: checkBook.title,
           bookId: checkBook._id,
           excerpt: checkBook.excerpt,
           userId: checkBook.userId,
           category: checkBook.category,
           review: checkBook.review,
           reviewData: checkReview
       }
       return res.status(200).send({ status: true, message: "update the revirew data", data: destBook })
   } catch (error) {
       return res.status(500).send({ status: false, message: error.message })
   }
}








const deleteReview = async function (req, res) {
    try {
        //validating book Id(params)
        let bookId = req.params.bookId
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: `Book id ${bookId} is not a valid` })

        //validating review Id(params)
        let reviewId = req.params.reviewId;
        if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: `review Id ${reviewId} is not a valid Id` })

        //Review delete for deleted book
        const deleteBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!deleteBook) {
            const updateReview = await reviewModel.findOneAndUpdate({ _id: reviewId, isDeleted: false }, { isDeleted: true }, { new: true })
        }

        //Review delete for present book
        const updateReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!updateReview) return res.status(404).send({ status: false, message: "review  data not found" })

        //==Updating review count in book document==//
        const deleteReviewCount = await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } }, { new: true })
        return res.status(200).send({ status: true, message: "Success", data: deleteReviewCount })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {createReview,updateReview,deleteReview}