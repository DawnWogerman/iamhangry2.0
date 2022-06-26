const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create post model
class Post extends Model {}

//create fields for post
Post.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false
        },

        num_of_drinks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            refrences: {
                model: 'user',
                key: 'id'
            }
        }
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);


module.exports = Post;