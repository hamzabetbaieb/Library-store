const bookController=require('../controllers/book.controller')
const router=require('express').Router()
const GuardAuth= require('./guardAuth')
const multer = require('multer')

router.get('/books',GuardAuth.isAuth,bookController.AllbookController)
router.get('/books/:id',GuardAuth.isAuth,bookController.OnebookController)


router.get('/addbook',GuardAuth.isAuth,bookController.getAddBookController)
router.post('/addbook',multer({
  storage:multer.diskStorage({
    destination:function(req,file,cd){
      cd(null,'assets/uploads')
    },
    filename:function(req,file,cd){
      cd(null,Date.now()+'-'+file.originalname )
    }
  })
}).single('image'),GuardAuth.isAuth,bookController.postAddBookController)

router.get('/mybooks',GuardAuth.isAuth,bookController.getMyBooksPage)
module.exports=router