"use strict";
const Step = require("step");

const { db_ops} = require("../dbutils/dbConn.js");
const saltRounds = 10;
var bcrypt = require("bcryptjs");

module.exports = class UserController {
  constructor(_name) {
    this.name = _name;
    console.info(this.name + " initialized");
  }
//Signup 
  addUser(req, res, next) {
    let self = this;
    let _body = req.body;
    let statusCode = 400;
    console.log("addUser ::::: ", req.body);
    if (_body) {
      Step(
        function _encryptPassword() {
            self.encryptPassword(_body, saltRounds, this);
        },
        function _findByEmail(err,hash) {
            if (err) {
                console.error(err);
                throw err;
            } else {
                _body.password = hash;
                self.findByEmail(_body, this);
            }
          
        },
        function _saveData(err, resp) {
          if (err) {
            throw "Unable to retrive data!";
          } else if (resp) {
            console.log("resp :::: ", resp);
            statusCode = 202;
            throw "Record already exist";
          } else {
            self.setData(req.body, this);
          }
        },

        function _sendResponse(err, _resp) {
          if (err) {
            console.error(err);
            res.status(statusCode).send({
              status: false,
              message: "Unable to retrive data!",
              error: err,
              response: null,
            });
          } else {
            res.status(200).send({
              status: true,
              message: "success",
              error: null,
              response: _resp,
            });
          }
        }
      );
    } else {
      console.log("addUser :::::  else ");
      res.status(200).send({
        status: false,
        message: "Required fileds are missing...",
        error: null,
      });
    }
  }
  //Encrypt Password
  async encryptPassword(body, saltRounds, cb) {
         bcrypt.hash(body.password, saltRounds, function (err, hash) {
        if (err) {
            console.error('err::::', err);
            cb(err, null);
        } else {
            console.log('hash::::', hash) //$2b$10$p/QCs8HaRAjov6kMvDwPSedVCOo4.ZvZ8hAsVw.vcskdeKDDGvQse
            cb(null, hash);
        }
    });
}
//find by email to check duplicate
  async findByEmail(body, cb) {
     try {
      let email = await db_ops.findByEmail(body.email);
      return cb(null, email);
    } catch (err) {
      return cb(err, null);
    }
  }
//set schema to DB
  async setData(body, cb) {
    db_ops
      .setData(body)
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err, null);
      });
  }
};
