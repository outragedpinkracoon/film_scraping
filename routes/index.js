var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var FileService = require('../lib/services/fileService');
var DisplayModel = require('../lib/models/displayModel');
var KeyValuePair = require('../lib/models/keyValuePair');

var router = express.Router();

router.get('/', function (req, res, next) {
    var $ = cheerio.load(fs.readFileSync('result2.html'));

    var elements = $("table").eq(2).find("tr").eq(0).find("a");
    var results = []
    
    elements.each(function (i, elem) {
        var model = new DisplayModel();
        model.name = $(this).text();
        results[i] = model;
    });
    
   elements = $("table").eq(2).find("tr").eq(2).find("td");
   for (var i = 0; i < 5; i++) { 
        var amount = elements.eq(i+1).find("font").eq(1).text();
        var kvp = new KeyValuePair();
        kvp.value = amount;
        kvp.key = i;
        results[i].dataPoints.push(kvp);
    }
   
    
    var json = { data: results };
    res.render('home/index', json);
});

module.exports = router;

//find number
    //var table = $("table")[2];
    // var tr = $(table).find("tr")[1];
    // var td = $(tr).find("td")[1];
    // var font1 = $(td).find("font")
    // var font2 = font1.find("font")[0]
    // var children = font2.children[0]
    // var data = children.data;
    
//find name
    // var tr = $(table).children("tr")[0];
    // var td = $(tr).children("td")[1];
    // var a = $(td).find("a")[0];
    // var child = a.children[2]