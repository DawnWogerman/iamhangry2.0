const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create post model
class Post extends Model {
    static lit(body, models) {
      return models.VerifiedDrunk.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'num_of_drinks',
            'location',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM verifieddrunk WHERE post.id = verifieddrunk.post_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  }

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