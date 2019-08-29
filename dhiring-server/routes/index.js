var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// new a router: user register
router.post('/register', function (req, res) {
  const { username, password } = req.body;
  if (username==='admin') {
    res.send({code: 1, msg:'user already existed!'});
  } else {
    res.send({code: 0, data: {id: 'abc123', username, password}});
  }
});

module.exports = router;
