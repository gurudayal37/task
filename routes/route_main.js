'use strict';

module.exports = (app)=>{
  const port = 3000;
  const express = require('express');
  const server =  require('http').Server(app);
  const jwt = require('jsonwebtoken');

  const User = require('../controllers/user');
  const JsonPatch = require('../controllers/jsonpatch.js');
  const Thumbnail = require('../controllers/thumbnail.js');

  app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
  });

  const secureRoutes = express.Router();

  app.use('/secure-api',secureRoutes);
  secureRoutes.use((req,res,next)=>{
    const token = req.headers['token'];
    jwt.verify(token,'mysecretkey',function(err,authData){
      if(err){
        res.json({msg:"Please enter the generated token "});
      }
      else {
        next();
      }
    });
  });

  //open route
  app.route('/login').post(User.login);

  //securedRoutes
  secureRoutes.route('/jsonpatch').post(JsonPatch.applyjsonpatch);
  secureRoutes.route('/thumbnail').post(Thumbnail.returnThumbnail);

}
