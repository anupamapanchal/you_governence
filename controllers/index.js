var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index')
})
router.get('/download', function(req, res) {
	res.download("./public/downloads/final.csv");
})

module.exports = router