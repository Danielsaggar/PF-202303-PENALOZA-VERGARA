var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/asignar', function(req, res, next) {  
  res.render('asignacion');
});

module.exports = router;