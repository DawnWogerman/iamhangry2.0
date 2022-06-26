const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Review } = require('../models');;

router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'num_of_drinks',
        'location',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM verifieddrunk WHERE post.id = verifieddrunk.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Review,
          attributes: ['id', 'review_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        console.log(dbPostData[0]);
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('homepage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });






module.exports = router;