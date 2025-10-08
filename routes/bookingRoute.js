const express = require('express');
const authContoller = require('../controllers/authContoller');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authContoller.protect);
router.get('/checkout-session/:tourID', bookingController.getCheckoutSession);

router.use(authContoller.restrictTo('admin', 'lead-guide'));
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);
module.exports = router;
