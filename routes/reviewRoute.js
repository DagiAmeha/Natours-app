const express = require('express');
const authContoller = require('../controllers/authContoller');
const reviewController = require('../controllers/reviewController');

const router = express.Router({
  mergeParams: true,
});

router.use(authContoller.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authContoller.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authContoller.restrictTo('user', 'admin'),
    reviewController.updateReview,
  )
  .delete(
    authContoller.restrictTo('user', 'admin'),
    reviewController.deleteReview,
  );
module.exports = router;
