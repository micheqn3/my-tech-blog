const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection')

class Comment extends Model {}

Comment.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    user_id: { // References the User model's ID. post belongs to a User.
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
    
    post_id: { // References the Post model's ID. This comment belongs to a Post.
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id',
        }
    }
}, { 
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
    }
);

module.exports = Comment;