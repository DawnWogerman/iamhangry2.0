const router = require('express').Router();
const { Review } = require('../../models');

router.get('/', (req, res) => {
    Review.findAll()
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.post('/', (req, res) => {
    
    Review.create({
      review_text: req.body.review_text,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.delete('/:id', (req, res) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
     .then(dbReviewData => {
        if(!dbReviewData){
            res.status(404).json({ message: 'No reveeiew fernd with this id'});
            return;
        }
        res.json(dbReviewData);
     })
     .catch(err => {
        console.log(err);
        res.status(500).json(err);
     });
});




module.exports = router;