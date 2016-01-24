var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var DisplayModel = require('../lib/models/displayModel');
var KeyValuePair = require('../lib/models/keyValuePair');

var router = express.Router();

var TableHeaders = function ($) {
    this.generate = function () {
        var results = [];
        var elements = $("table").eq(2).find("tr").eq(0).find("a");

        elements.each(function (i, elem) {
            var model = new DisplayModel();
            model.name = $(this).text();
            results[i] = model;
        });
        return results;
    }
}

var TableData = function ($, headers) {
    this.generate = function () {
        var results = headers;
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
        return results;
    }
}

var Parser = function () {
    var $ = cheerio.load(fs.readFileSync('result.html'));

    this.init = function () {
        var headers = new TableHeaders($).generate();
        this.results = new TableData($, headers).generate();
    }

    this.init();
}

router.get('/', function (req, res, next) {

    var parser = new Parser();

    var json = { data: parser.results };
    res.render('home/index', json);
});

module.exports = router;