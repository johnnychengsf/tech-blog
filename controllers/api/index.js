const router = require('express').Router();

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/post', require('./post-routes'));
router.use('/comment', require('./comment-routes'));

module.exports = router;
