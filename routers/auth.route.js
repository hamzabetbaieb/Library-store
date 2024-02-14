const router= require('express').Router()
const AuthController=require('../controllers/auth.controller')
const body = require('express').urlencoded({extended:true})//bodyparser
const GuardAuth= require('./guardAuth')

router.get('/register',GuardAuth.notAuth,AuthController.registerUserController)
router.post('/register',body,AuthController.postUserController)
router.get('/login',GuardAuth.notAuth,AuthController.loginPageController)
router.post('/login',body,AuthController.loginPostController)
router.get('/logout',AuthController.logoutFunctionController)
module.exports=router