'use strict'

const jwt = require('jsonwebtoken');

exports.login = (req,res)=>{
  const user = {
    username : req.body.username,
    password : req.body.password
  }
  jwt.sign({user},'mysecretkey',(err,token)=>{
    res.json({
      user:user,
      token:token
    })
  });
}
