const router = require('express').Router();
const userRoute = require('./userRoutes');
const blogRoute = require('./blogRoutes');
const commentRoute = require('./commentRoutes');

router.use('/users', userRoute);
router.use('/blogs', blogRoute);
router.use('/comments', commentRoute);

module.exports = router;