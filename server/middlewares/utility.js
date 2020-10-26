const jsonwebtoken = require("jsonwebtoken");
const config = require('../config/mongoConfig.js');

module.exports = class Utility {
    constructor(_name) {

    }
     generateJwtToken(_email, _password, tokenExpiry, cb) {
        let jwt = jsonwebtoken.sign({
            email: _email,
            password: _password
        }, config.jwtSecret, {
            expiresIn: tokenExpiry ? tokenExpiry : config.tokenExpiry
        })
        if (jwt) {
            return cb(null, {
                "token": jwt,
                "error": null
            });
        } else {
            return cb('JWT token generation failed', {
                "token": null,
                "error": 'JWT token generation failed'
            });
        }
    }

    validateJwtToken(_jwtToken, cb) {
        jsonwebtoken.verify(_jwtToken, config.jwtSecret, function (err, decoded) {
            if (err) {
                console.log(' jwt verify err :::: ', err.message ? err.message : err);
                return cb(err, null);
            } else {
                return cb(null, decoded);
            }

        });
    }
};