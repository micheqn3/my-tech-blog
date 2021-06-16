const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const dashRoutes = require('./dashboard-routes')

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use('/dash', dashRoutes);

module.exports = router;