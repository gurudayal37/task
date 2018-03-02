const express = require('express');

const app = express();
const server =  require('http').createServer(app);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('It is working');
});

require('./routes/route_main.js')(app);

module.exports = {app};
