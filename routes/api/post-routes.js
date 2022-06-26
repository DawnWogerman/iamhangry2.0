const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, VerifiedDrunk } = require('../../models');

//get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: ['id', 'location', 'num_of_drinks', 'created_at',
    [sequelize.literal('(SELECT COUNT(*) FROM verifieddrunk WHERE post_id = verifieddrunk.post_id)'), 'vote_count']
 ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// /api/post/lit - Create verified drunk vote
router.put('/lit', (req, res ) => {
    // custom static method created in models/Post.js
  Post.lit(req.body, { VerifiedDrunk })
  .then(updatedPostData => res.json(updatedPostData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});
//update number of drinks
router.put('/:id', (req, res)=>{
    Post.update({
        num_of_drinks: req.body.num_of_drinks
    },
    {
        where: {
            id: req.params.id
        }
    }
  )
    .then(dbPostData =>{
        if(!dbPostData){
            res.status(400).json({ message: 'No drunkeness found with this Id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
   


module.exports = router;