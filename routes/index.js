const router = require('express').Router();

//import all api routes from api
const apiRoutes = require('./api');


router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
  });

  module.exports = router;