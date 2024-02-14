const express = require('express')
const path = require('path')
//const bookController=require('./controllers/book')
const routerhome= require('./routers/home.route')
const routerbook= require('./routers/book.route')
const routerAuth=require('./routers/auth.route')
const session = require('express-session')
const mongodbstore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')

const app = express() 



app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')
app.use(flash())

var Store=new mongodbstore({
  uri :  "mongodb://127.0.0.1:27017/library",
  collection : "sessions"
})
app.use(session({
  secret:'this is my secret key',
  /*cookie:{
    maxAge
  },*/
  store:Store,
  resave: true,
  saveUninitialized: true
}))
//app.get('/',bookController.bookController)
app.use('/',routerhome)
app.use('/',routerbook)
app.use('/',routerAuth)
//app.use('/books',routerBook.All)
app.get('/contact',(req,res,next)=>{
  res.render('contact',{verifUser:req.session.userid})
  })
  app.get('/about',(req,res,next)=>{
    res.render('about',{verifUser:req.session.userid})
    })
      /*app.get('/mybooks',(req,res,next)=>{
      res.render('mybooks',{verifUser:req.session.userid})
      })
  app.get('/add',(req,res,next)=>{
res.render('addbook',{verifUser:req.session.userid})
    })
    app.get('/details',(req,res,next)=>{
      res.render('details')
      })
     app.get('/login',(req,res,next)=>{
        res.render('login')
        })
       app.get('/register',(req,res,next)=>{
          res.render('register')
          })*/
  

app.listen(5000,()=>console.log("server connected on port 5000"))