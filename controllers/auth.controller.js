const AuthModel = require('../models/auth.model')

exports.registerUserController=(req,res,next)=>{
res.render('register',{verifUser:req.session.userid,message:req.flash('error')[0]})
}
exports.postUserController=(req,res,next)=>{
  AuthModel.postUserModel(req.body.name,req.body.email,req.body.password).then((user)=>{
    res.render('login',{verifUser:req.session.userid})
  }).catch((err)=>{
  req.flash('error',err)
    //  console.log(err)
    res.redirect('/register')
  })
}
exports.loginPageController=(req,res,next)=>{
  res.render('login',{verifUser:req.session.userid,message:req.flash('error')[0]})
}
exports.loginPostController=(req,res,next)=>{
AuthModel.postLoginModel(req.body.email,req.body.password).then((id)=>{
  req.session.userid=id
  res.redirect('/')
}).catch((err)=>{
  req.flash('error',err)
  res.redirect('/login')
  //console.log(err)
})
}
exports.logoutFunctionController=(req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect('/login')
  })
  
}