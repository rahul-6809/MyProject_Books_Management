const express= require('express')
const router= express.Router()

const {userLogin,userRegistration}=require('../controllers/userController')
const { createBook,getBook,getBookById,updateBookById,deleteBookById}=require('../controllers/bookController')
const{createReview,updateReview,deleteReview}=require('../controllers/reviewController')
const {UserAuthorization,UserAuthenticate} = require('../middleware/auth')

router.post('/register',userRegistration)
router.post('/login', userLogin)


 router.post('/books',  UserAuthenticate,createBook)
router.get('/books', UserAuthenticate, getBook)
router.get('/books/:bookId' ,  UserAuthenticate ,getBookById)
router.put('/books/:bookId',  UserAuthenticate ,UserAuthorization,updateBookById)
router.delete('/books/:bookId',  UserAuthenticate ,UserAuthorization,deleteBookById)

router.post('/books/:bookId/review' ,createReview)
router.put('/books/:bookId/review/:reviewId', updateReview)
router.delete('/books/:bookId/review/:reviewId', deleteReview)

module.exports = router;
