const mongodb = require('mongodb');
const mongoose = require('mongoose');
const MongoClient = mongodb.MongoClient;
const config = require('../config/mongoConfig.js');
const objectId = mongodb.ObjectId
let db;
const {User} = require('../models/users.js')
const {UserToken}= require('../models/users')
let db_ops={}


function connectWithMongoose(){
mongoose.connect(config.mongodbServer, { useNewUrlParser: true, useUnifiedTopology: true });

}

function connectMongo(callback){
    MongoClient.connect(config.mongodbServer,{useUnifiedTopology: true},(err,dbObj)=>{
        if(err){
            console.log('Momgo Error',err);
        }else{
            db=dbObj.db('iConnectApp')
            console.info('Mongo is running',config.mongodbServer);
            callback()
        }
    })
}
db_ops.getData=()=> {
    return new Promise((resolve, reject) => {
      User.find()
        .then((users) => {
          resolve(users);
        })
        .catch((err) => reject(err));
    });
};
  
  db_ops.findByEmail=(mail)=>{
    return new Promise((resolve, reject) => {
      User.findOne({ email: mail })
        .then((users) => {
          resolve(users);
        })
        .catch((err) => reject(err));
    });
  };
  
  db_ops.setData =(data) =>{
   return new Promise((resolve, reject) => {
      let userData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      };
      User.create(userData)
        .then((userDetails) => resolve(userDetails))
        .catch((err) => reject(err));
    });
  };

  db_ops.setToken =(data) =>{
    return new Promise((resolve, reject) => {
       let userData = {
        authToken: data.token,           
       };
       UserToken.create(userData)
         .then((userDetails) => {resolve(userDetails) 
        })
         .catch((err) => reject(err));
     });
   };
module.exports={
    connectWithMongoose,connectMongo,db_ops
}