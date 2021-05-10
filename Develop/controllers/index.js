const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoute= require('./profileRoute')

router.use('/', homeRoutes);
router.use('/profile', profileRoute)
router.use('/api', apiRoutes);


module.exports = router;