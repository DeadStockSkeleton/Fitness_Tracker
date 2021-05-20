const router = require('express').Router();

const routes = require('./routes.js');
const api = require('./api.js');

router.use('/', routes);
router.use('/api', api);

module.exports = router;