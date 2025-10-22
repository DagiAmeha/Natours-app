/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Rkp6fBCL9KvqzD7n6nKP4qnYWyb7oaWHnqIFo8MMItwXaNv77AREfrzZOo2dw1rW5I5cKY7jnTb7gAtrQm7Lt2300v6wFTiIw',
);

const hostName =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://natours-dag.onrender.com';

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API

    const session = await axios(
      `${hostName}/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session.data.session.id);
    //   2. create checkout form  + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err.message);
  }
};
