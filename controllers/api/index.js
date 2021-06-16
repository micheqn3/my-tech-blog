const router = require('express').Router();
const userRoute = require('./user-routes');
const postRoute = require('./post-routes');
const commentRoute = require('./comment-routes');

router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute)


module.exports = router;