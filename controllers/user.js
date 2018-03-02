'use strict'

const jwt = require('jsonwebtoken');

exports.login = (req,res)=>{
  const user = {
    username : req.body.username,
    password : req.body.password
  }
  jwt.sign({user},'mysecretkey',function(err,token){
    res.json({
      token:token
    })
  });
}
