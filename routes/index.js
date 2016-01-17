var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var FileService = require('../lib/services/fileService'); 

var router = express.Router();

router.get('/', function (req, res, next) {
    var $ = cheerio.load(fs.readFileSync('result.html'));
    var table = $("table")[2];
    var tr = $(table).find("tr")[1];
    var td = $(tr).find("td")[1];
    var font1 = $(td).find("font")
    var font2 = font1.find("font")[0]
    var children = font2.children[0]
    var data = children.data;
    var week1sw = data, week1avatar = data;
    var json = { week1sw: week1sw, week1avatar: week1avatar };
    res.render('home/index', json);
});

module.exports = router;