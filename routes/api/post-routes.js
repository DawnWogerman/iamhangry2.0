const router = require('express').Router();
const { Post, User } = require('../../models');

//get all users
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'location', 'num_of_drinks', 'created_at' ],
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

router.get('/:id', (req, res)=> {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'location', 'num_of_drinks', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })

    .then(dbPostData =>{
        if(!dbPostData) {
            res.status(404).json({ message: "No drunkeness found with this Id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) =>{
    Post.create({
        location: req.body.location,
        num_of_drinks: req.body.num_of_drinks,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
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