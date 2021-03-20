const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// adds the /users to our routes set up in user routes
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes)


module.exports = router;