// Seeds for post table
const Post = require('../models/Post')

const postD= [
    {
      "title": "I love ORM",
      "body": "ORM's make SQL queries so much easier! My favorite one is Sequelize because I love object-oriented programming so much!",
      "user_id": 1

    },
    {
        "title": "JavaScript is the superior language!",
        "body": "I know C++ and compared to JavaScript, JavaScript is the superior language.... C++ is very manual while JavaScript has everything included.",
        "user_id": 1
  
    },
    {
        "title": "Back-end is necessary",
        "body": "Learning back-end really makes you delve into JavaScript more and makes client-side JS stronger too. I love coding in the back-end!",
        "user_id": 1
  
    },
    {
        "title": "Curious about React",
        "body": "I heard awesome things about React framework...should I start it? Didn't one of the big tech companies create this framework?",
        "user_id": 2
  
    }
]


const seedPosts = () => Post.bulkCreate(postD);
  
module.exports = seedPosts;