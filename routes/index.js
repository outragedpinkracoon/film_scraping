var express = require('express');
var Parser = require('../lib/models/parsing/parser');

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('home/index');
});

router.get('/data', function (req, res, next) {

    var parser = new Parser();
    res.json({ data: parser.results  });
});

module.exports = router;