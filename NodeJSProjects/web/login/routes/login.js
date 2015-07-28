/**
 * @name login
 * @description login API handler. NOTE! This is a basic example not intended for actual use! For your own webapps
 * look into hashing passwords and other security measures.
 * @type {*|exports|module.exports}
 */
var express = require('express');
var router = express.Router();

/**
 * HTTP POST handler for login API
 */
router.post('/', function(req, res, next) {
  var HTTP_CODE = {
    'OK': 200,
    'Unauthorized': 401
  };
  if (req.body.email === 'cjus34@gmail.com' && req.body.password === 'password') {
    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Login successful'
    });
  } else {
    res.status(HTTP_CODE.Unauthorized).json({
      success: false,
      message: 'Login unsuccessful'
    });
  }
});

module.exports = router;
