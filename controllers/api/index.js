const router = require('express').Router();
const userRoute = require('./user-routes');
const postRoute = require('./post-routes');

router.use('/user', userRoute);
router.use('/post', postRoute);


module.exports = router;