var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var FileWriter = require('../lib/io/fileWriter'); 

var router = express.Router();

router.get('/', function (req, res, next) {
    var url = 'http://www.boxofficemojo.com/showdowns/chart/?view=daily&id=liberge.htm';
    request(url, function (error, response, html) {
        if (!error) {
            new FileWriter().writeFile("result.html", html, function(result){
                res.render('scraping/index', { result: result });
            })
        }
    });
});

module.exports = router;