var express = require('express');
var Parser = require('../lib/models/parsing/parser');

var router = express.Router();

router.get('/', function (req, res, next) {

    var parser = new Parser();

    var json = { data: parser.results };
    res.render('home/index', json);
});

module.exports = router;