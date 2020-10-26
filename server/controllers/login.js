const Step = require('step');
const utility = require('../middlewares/utility');

const { db_ops} = require("../dbutils/dbConn.js");
const config = require('../config/mongoConfig');
const bcrypt = require('bcrypt');
module.exports=class Login{
    constructor(_name){
        this.name=_name
        console.log(this.name + ' initialized');
        this.utilityObj=new utility();
    }
// Authenticate
    authenticateUser(req,res,next){
        let _body=req.body
        let self=this
        let memberDetails, _token;
        if(_body && _body.email && _body.password){
            Step(
                function _getData() {
					self.findByEmail(_body, this);
                },
                
                function _validator(err,resp){
                    if(err){
                        console.log('getData error::',err);
                        throw err;
                    }else{
                        
                        self.validateUser(_body, resp, this)
                            
                        
                    }
                },

                function _getToken(err,resp){
                    if(err){
                        console.log('validate user error::',err);
                        throw err;
                    }
                    else if (!resp) {
						throw 'Unauthorised User';
					} 
                    else{
                        self.utilityObj.generateJwtToken(_body.email,_body.password,config.tokenExpiry,this)   
                    }
                },
                
                function _saveToken(err,resp){
                    if(err){
                        console.log('generateJwtToken error::',err);
                        res.status(401).send({
							"status": false,
							"message": err,
							"response": null,
							"authorized": false
						});
                    }else{
                        _token=resp.token
                        let _body = {
                            token: _token
                        }
                        self.saveMemberToken(_body, this.parallel())
                    }
                },

                function _sendResponse(_err, _resp) {
					if (_err) {
						console.error(_err);
						res.status(401).send({
							"status": false,
							"message": _err,
							"response": null,
							"authorized": false
						});
					} else {
						res.status(200).send({
							"status": true,
							"message": null,
							"response":{
                                authToken:_token
                            },
							"memberDetails": memberDetails,
							"authorized": true
						})
					}
				}

            )

        }

    }
// find by email
    async findByEmail(body, cb) {
        try {
        let email = await db_ops.findByEmail(body.email);
        return cb(null, email);
      } catch (err) {
        return cb(err, null);
      }
    }
// Validate by comparing password from db and user input
    validateUser(body, respData, cb) {
		bcrypt.compare(body.password,respData.password, function(err, result) {
			if (err) {
				console.error('Error in getToken()', err);
				return cb(err, null);
			} else {
                return cb(null, result);
			}
		});
    }
// save token 
saveMemberToken(body, cb) {
	db_ops
      .setToken(body)
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err, null);
      });
	}
}