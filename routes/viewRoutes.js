const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authContoller');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview,
);
router.get('/tours/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/signup', viewsController.getSignUpForm);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/logout', authController.logout, viewsController.getOverview);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-bookings', authController.protect, viewsController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData,
);
module.exports = router;
