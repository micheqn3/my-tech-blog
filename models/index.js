// Import Models and create associations
const User = require('./User');
const Post = require('./Post');

// Post belongs to User
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

// User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
})

module.exports = {
    Post, 
    User
  };