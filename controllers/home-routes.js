const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Review, VerifiedDrunk } = require('../models');;

router.get('/', (req, res) => {
    console.log('======================');
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
        const posts = dbPostData.map(post => post.get({ plain: true}));
        
        res.render('homepage', {
           posts,
          loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
//session code doesn't work
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn
    });
})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;