var cheerio = require('cheerio');
var fs = require('fs');
var TableHeaders = require('./tableHeaders');
var TableData = require('./tableData');

var Parser = function () {
    var $ = cheerio.load(fs.readFileSync('result.html'));

    this.init = function () {
        var rows = $("table").eq(2).find("tr");
        var headers = new TableHeaders($, rows).generate();
        this.results = new TableData($, headers, rows).generate();
    }

    this.init();
}

module.exports = Parser;