// Seeds for user table
const User = require('../models/User')

const userD = [
  {
    "userName": "jeff",
    "email": "jeff@gmail.com",
    "password": "password12345"

},
{
    "userName": "mich",
    "email": "mich@gmail.com",
    "password": "password12345"

}
]


const seedUser = () => User.bulkCreate(userD);
  
module.exports = seedUser;