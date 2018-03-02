'use strict'

const jsonpatch = require('fast-json-patch');

exports.applyjsonpatch = (req,res)=>{
  var document = jsonpatch.applyPatch(req.body.document, req.body.patch).newDocument;
  res.json({document});
}
