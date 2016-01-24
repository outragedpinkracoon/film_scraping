var KeyValuePair = require('../keyValuePair');

var TableData = function ($, headers, rows) {
    this.results = headers;

    var createColumnData = function (columns, results) {
        var maxColumns = 5;

        for (var column = 0; column < maxColumns; column++) {
            var amount = columns.eq(column + 1).find("font").eq(1).text();
            if(amount == "")
                amount = 0;
            var kvp = new KeyValuePair(column, amount);
            results[column].dataPoints.push(kvp);
        }
    }

    var included = function(columns)
    {
        var first = columns.find("b").eq(0).text().toLowerCase();
        var validLength = columns.length == 6;
        var notEmpty = first != "";
        var notWeekSummary = first.indexOf("wk") == -1;
        return  validLength && notEmpty && notWeekSummary
    }

    this.generate = function () {
        var rowCount = rows.length - 1;
        var rowsToSkip = 2;

        for (var row = rowsToSkip; row < rowCount; row++) {
            var columns = rows.eq(row).find("td");
            if (included(columns))
                createColumnData(columns, this.results);
        }
        return this.results;
    }
}

module.exports = TableData;