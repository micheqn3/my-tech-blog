const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection')

class Post extends Model {}

Post.init(
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Use Sequelize's UUID functionality to generate a unique number
        allowNull: false, 
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notNull: true
        }
    },
    user_id: { // References the User model's ID. This post belongs to one User.
        type: DataTypes.INTEGER, 
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, { 
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
    }
);

module.exports = Post;