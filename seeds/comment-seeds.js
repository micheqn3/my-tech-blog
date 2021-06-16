// Seeds for comment table
const Comment = require('../models/Comment')

const commentD= [
    {
      "body": "BODY 1",
    },
    {
      "body": "BODY 2",
    },
    
]


const seedComments = () => Comment.bulkCreate(commentD);
  
module.exports = seedComments;