const express= require('express')
const router= express.Router()

const {userLogin,userRegistration}=require('../controllers/userController')

router.post('/register',userRegistration)
router.post('/login', userLogin)


router.post('/books', createBook)
router.get('/books', getBook)
router.get('/books/:bookId' , getBookById)
router.put('/books/:bookId', updateBookById)
router.delete('/books/:bookId', deleteBookById)

router.post('/books/:bookId/review' ,createReview)
router.put('/books/:bookId/review/:reviewId', updateReview)
router.delete('/books/:bookId/review/:reviewId', deleteReview)

module.exports = router;
