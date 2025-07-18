const express = require('express');
const authContoller = require('../controllers/authContoller');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/checkout-session/:tourID',
  authContoller.protect,
  bookingController.getCheckoutSession,
);
module.exports = router;
