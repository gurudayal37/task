const jwt = require('jsonwebtoken');

const user = {
  username:'gurudayal',
  password:'tlpl1234',
  token:jwt.sign({username:'gurudayal',password:'tlpl1234'},'mysecretkey')
}

module.exports={user};
