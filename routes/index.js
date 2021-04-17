const router = require('express').Router();

const routes = require('./routes');
const api = require('./api');

router.use('/', routes);
router.use('/api', api);

module.exports = router;