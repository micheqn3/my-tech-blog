const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection')

class User extends Model {}

User.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    }, 
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            isEmail: true,
            notNull: true
        }
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            len: [8],
        }
    },
  
}, { 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
    }
);

module.exports = User;