const bookModel= require('../models/BooksModels.js')
const {isValid, isValidDate, isValidISBN,isValidObjectId}=require('../validate/validation')
const validator=require('validator')
const reviewModel=require('../models/ReviewModels.js')





















const  createBook= async (req,res) =>{
    try{
 const {title,excerpt,userId,ISBN,category,subcategory, isDeleted,releasedAt}=req.body

 if(!isValid(title)||!isValid(excerpt)||!isValid(userId)||!isValid(ISBN)||!isValid(category)||!isValid(subcategory)||!isValid(releasedAt))
 {
    return res.status(400).send({status:false,message:"please provide a madetory details"})
 }

 //checking database userId present
       let isUniqueUserId = await userModel.findOne({ _id: userId })
        if (!isUniqueUserId) return res.status(400).send({ status: false, message: "User not found" })

        //validating ISBN and checking database
        
        //if (!isValidISBN(ISBN)) return res.status(400).send({ 
         if (!validator.isISBN(ISBN)) return res.status(400).send({  
        status: false, message: "ISBN is invalid " })
        let isUniqueISBN = await bookModel.findOne({ ISBN: ISBN })
        if (isUniqueISBN) return res.status(400).send({ status: false, message: `${ISBN} is already exist` })


        //format date

        if (!isValidDate(releasedAt)) return res.status(400).send({ status: false, message: "Please provide date in YYYY-MM-DD format" })


//Creating Book Document
 const bookdata={ title, excerpt, userId, ISBN, category, subcategory, isDeleted, releasedAt };
       
 const saveBook = await bookModel.create(bookdata)
 res.status(201).send({ status:true, data:saveBook})


    } catch(err){
        return res.status(500).send({status:false, message:err.message});
     }
}















const getBook=async (req, res) =>{
    try{
      

      //getting sorted book-list without query params

      let check= await bookModel.find({isDeleted:false}).sort({'title':1});
      if(check.length==0){ return res.status(400).send({status:false,message:'Book not found'});
    }

    //getting sorted book-list with query params

    let userId = req.query.userId
        let category = req.query.category
        let subcategory = req.query.subcategory


        let filter={isDeleted:false}

        if(isValid(userId)){
         if(!isValidObjectId(userId)){
         return res.status(400).send({status:false, message:`${userId} is not a valid`})
        }
        filter['userId'] =userId
      }

      if(isValid(subcategory)){
         let subArr = subcategory.trim().split(',').map(element => element.trim())
         filter['subcategory'] ={$all:subArr}
      }
 
      if(isValid(category)){
         filter['category'] =category
      }

//finding and sorting books

      let booklist = await bookModel.find(filter, { _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, subcategory: 1, reviews: 1, releasedAt: 1 }).sort({ 'title': 1 })

        if (booklist.length == 0) return res.status(404).send({ status: false, message: "Books not found." })

        res.status(200).send({ status: true, message: "Books list", data: booklist })


    }catch(err){
        return res.status(500).send({status:false, message:err.message});
}
}






















const getBookById =async (req,res)=>{

   try{
   const bookId= req.params.bookId
   if(!isValid(bookId)){
      return res.status(400).send({status:false, message:'BookId is not provided'});
   }
   if(!isValidObjectId(bookId)){ return res.status(404).send({status:false, message:"Invalid bookId"})}


   //getting book by book id
   const book = await bookModel.findone({_Id:bookId,isDeleted:false});
   if (!book) {return res.status(400).send({status:false, message:'book not found'});
   }
   
   //desturcting according readme
   const { title, excerpt, userId, category, reviews, subcategory, deletedAt, isDeleted, releasedAt} = bookList
        let details = { title, excerpt, userId, category, reviews, subcategory, deletedAt, isDeleted, releasedAt, createdAt, updatedAt }


        //finding and sending all reviews for book
        let getReview = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
        details["reviewData"] = getReview
        return res.status(200).send({ status: true, message: "Book list", data: details })

   }catch(err){ res.status(500).send({status:false, message:err.message});
}
}


const updateBookById = async(req,res)=>{
   try{

   }catch(err){
      return res.status(500).send({status:false, message:err.message});
   }
}








const deleteBookById = async(req,res)=>{
   try{

   }catch(err){
      return res.status(500).send({status:false, message:err.message});
   }
}









module.exports ={ createBook,getBook,getBookById,updateBookById,deleteBookById}