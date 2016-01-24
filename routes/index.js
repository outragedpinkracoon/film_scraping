var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var FileService = require('../lib/services/fileService');
var DisplayModel = require('../lib/models/displayModel');
var KeyValuePair = require('../lib/models/keyValuePair');

var router = express.Router();

var DataThing = function () {
    var $ = cheerio.load(fs.readFileSync('result.html'));
    this.init = function () {
        this.headers();
    }
    this.headers = function () {
        var results = [];
        var elements = $("table").eq(2).find("tr").eq(0).find("a");

        elements.each(function (i, elem) {
            var model = new DisplayModel();
            model.name = $(this).text();
            results[i] = model;
        });
        return results;
    },
    this.results = this.headers();
}

router.get('/', function (req, res, next) {

    var d = new DataThing();
    var results = d.results;
    var $ = cheerio.load(fs.readFileSync('result.html'));
    var elements = $("table").eq(2).find("tr").eq(2).find("td");

    for (var i = 2; i < 6; i++) {
        elements = $("table").eq(2).find("tr").eq(i).find("td");
        for (var k = 0; k < 5; k++) {
            var amount = elements.eq(k + 1).find("font").eq(1).text();
            var kvp = new KeyValuePair();
            kvp.value = amount;
            kvp.key = k;
            results[k].dataPoints.push(kvp);
        }
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