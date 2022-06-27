const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Review.findAll()
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
      Review.create({
        review_text: req.body.review_text,
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.user_id
      })
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });
router.delete('/:id', withAuth, (req, res) => {
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