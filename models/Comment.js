const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection')

class Comment extends Model {}

Comment.init(
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Use Sequelize's UUID functionality to generate a unique number
        allowNull: false, 
        primaryKey: true,
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
        type: DataTypes.UUID,
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