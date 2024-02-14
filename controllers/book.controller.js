const homeModel= require('../models/home.model')



exports.AllbookController=(req,res,next)=>{
  homeModel.getallBooks().then((books) => {
    res.render('books',{books:books,verifUser:req.session.userid})
  }).catch((err) => {
    res.send("erreurr")
  });
}
exports.OnebookController=(req,res,next)=>{
  let id = req.params.id
  homeModel.getoneBook(id).then((onebook) => {
    res.render('details',{book:onebook,verifUser:req.session.userid})
  }).catch((err) => {
    res.send(err)
  });
}

exports.getAddBookController=(req,res,next)=>{
  res.render('addbook',{verifUser:req.session.userid,Smessage:req.flash('SuccessMessage')[0],Emessage:req.flash('ErrorMessage')[0]})
}
exports.postAddBookController=(req,res,next)=>{
homeModel.postDataBookModel(req.body.title,req.body.description,req.body.author,req.body.price,req.file.filename,req.session.userid).then((msg)=>{
  req.flash('SuccessMessage','book added succefuly')
  res.redirect('addbook')
  //console.log(msg)
}).catch((err)=>{
  req.flash('ErrorMessage',err)
  res.redirect('addbook')
})
}
exports.getMyBooksPage=(req,res,next)=>{
  homeModel.getmyBooks(req.session.userid).then((books)=>{
    console.log(books)
    res.render('mybooks',{books:books,verifUser:req.session.userid})
  })
  
}

