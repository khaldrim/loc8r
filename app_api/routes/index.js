const express = require('express');
const router  = express.Router();

const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

const ctrlLocations = require('../controllers/locations');
const ctrlReviews   = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');
//locations
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);

router.
    route('/locations/:locationId')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

//reviews
router
    .route('/locations/:locationId/reviews')
    .post(auth, ctrlReviews.reviewsCreate);

router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(ctrlReviews.reviewsReadOne)
    .put(auth, ctrlReviews.reviewsUpdateOne)
    .delete(auth, ctrlReviews.reviewsDeleteOne);

//Auth
router.post('/register' ,ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;