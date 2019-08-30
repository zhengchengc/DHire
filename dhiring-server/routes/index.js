var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5');
const { UserModel } = require('../db/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// register router
router.post('/register', function (req, res) {
  // acquire request data
  const { username, password, type } = req.body;
  // check if user existed
  UserModel.findOne({username}, function (err, user) {
    // if user exists
    if (user) {
      // return error message
      res.send({code: 1, msg: 'User exists!'})
    } else {
      // save the user
      new UserModel({ username, password: md5(password), type }).save(function (err, user) {
        // generate a cookie, save in browser
        res.cookie('userid', user._id, {maxAge: 1000*60*60^24*7});
        // return json include user data
        const data = { username, type, _id: user._id }; // DON'T INCLUDE PASSWORD IN RETURN MESSAGE
        res.send({code: 0, data });
      })
    }
  })
});
// login router

module.exports = router;
