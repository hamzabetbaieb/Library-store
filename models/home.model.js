const mongoose= require('mongoose')

var schemaBook = mongoose.Schema({

title :String,
description:String,
price:Number,
author:String,
image:String,
userid:String
})

var Book = mongoose.model('book', schemaBook);
const url = "mongodb://127.0.0.1:27017/library";

exports.getThreeBooks = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url)
      .then(() => {
        return Book.find().limit(3);
      })
      .then(books => {
        mongoose.disconnect().then(() => {
          resolve(books);
        });
      })
      .catch(err => {
        mongoose.disconnect().then(() => {
          reject(err);
        });
      });
  });
};

exports.getallBooks = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url)
      .then(() => {
        return Book.find();
      })
      .then(books => {
        mongoose.disconnect().then(() => {
          resolve(books);
        });
      })
      .catch(err => {
        mongoose.disconnect().then(() => {
          reject(err);
        });
      });
  });
};

exports.getmyBooks=(userid)=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(url).then(()=>{
      return Book.find({userid:userid})
    }).then(books=>{
       resolve(books)
    }).catch(err=>reject(err))
  })
}



exports.getoneBook = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url)
      .then(() => {
        return Book.findById(id);
      })
      .then(books => {
        mongoose.disconnect().then(() => {
          resolve(books);
        });
      })
      .catch(err => {
        mongoose.disconnect().then(() => {
          reject(err);
        });
      });
  });
};
exports.postDataBookModel=(title,description,author,price,filename,userid)=>{
return new Promise((resolve,reject)=>{
  mongoose.connect(url).then(()=>{
    let book = new Book({
      title:title,
      description:description,
      author:author,
      price:price,
      image:filename,
      userid:userid
    })
    book.save()
  }).then(()=>{
  //  mongoose.disconnect()
    resolve('added')
  }).catch((err)=>{
  //  mongoose.disconnect()
    reject(err)
  })
})
}






