const homeModel= require('../models/home.model')

exports.ThreebookController=(req,res,next)=>{
  homeModel.getThreeBooks().then((allbooks) => {
    res.render('index',{books:allbooks,verifUser:req.session.userid})
  }).catch((err) => {
    res.send("erreurr")
  });
}



