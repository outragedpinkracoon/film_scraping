var DisplayModel = require('../displayModel');
var TableHeaders = function ($,rows) {
    this.generate = function () {
        var results = [];
        var elements = rows.eq(0).find("a");

        elements.each(function (i, elem) {
            var model = new DisplayModel();
            model.name = $(this).text();
            results[i] = model;
        });
        return results;
    }
}

module.exports = TableHeaders;