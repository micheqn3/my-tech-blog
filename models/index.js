// Import Models and create associations
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Post belongs to User
Post.belongsTo(User, {
    foreignKey: 'user_id',
})

// User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
})

// Comment belongs to Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

// A Post has many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
})

module.exports = {
    Post, 
    User,
    Comment
};