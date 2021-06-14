const sequelize = require('../config/connection')
const Post = require('../models/Post');
const postData = require('./post-seeds')

const seedPosts = async () => {
    await sequelize.sync({force: true});
    await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true
    })
    process.exit(0);
}

seedPosts();