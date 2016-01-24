var cheerio = require('cheerio');
var fs = require('fs');
var TableHeaders = require('./tableHeaders');
var TableData = require('./tableData');

var Parser = function () {
    var $ = cheerio.load(fs.readFileSync('result.html'));

    this.init = function () {
        var headers = new TableHeaders($).generate();
        this.results = new TableData($, headers).generate();
    }

    this.init();
}

module.exports = Parser;