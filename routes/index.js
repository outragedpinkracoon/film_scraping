var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var FileService = require('../lib/services/fileService');
var DisplayModel = require('../lib/models/displayModel');
var KeyValuePair = require('../lib/models/keyValuePair');

var router = express.Router();

var Parser = function () {
    var $ = cheerio.load(fs.readFileSync('result.html'));
    this.init = function () {
        this.results = this.headers();
        this.data();
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
    this.data = function () {
        var elements = $("table").eq(2).find("tr").eq(2).find("td");

        for (var i = 2; i < 6; i++) {
            elements = $("table").eq(2).find("tr").eq(i).find("td");
            for (var k = 0; k < 5; k++) {
                var amount = elements.eq(k + 1).find("font").eq(1).text();
                var kvp = new KeyValuePair();
                kvp.value = amount;
                kvp.key = k;
                this.results[k].dataPoints.push(kvp);
            }
        }
    }
    this.init(); 
}

router.get('/', function (req, res, next) {

    var parser = new Parser();

    var json = { data: parser.results };
    res.render('home/index', json);
});

module.exports = router;