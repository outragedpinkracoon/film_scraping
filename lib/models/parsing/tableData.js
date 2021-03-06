var KeyValuePair = require('../keyValuePair');

var TableData = function ($, headers, rows) {
    this.results = headers;

    var sanitise = function (amount) {
        var result = amount;
        //something is weird in the data not sure which is erroring it  
        try {
            result = result.replace(new RegExp(",", 'g'), "");
            result = result.replace("$", "");
            result = result.replace(new RegExp(" ", 'g'), "");
            return parseInt(result);
        }
        catch (err) {
            return 0;
        }

    }

    var createColumnData = function (columns, results, key) {
        var maxColumns = 5;

        for (var column = 0; column < maxColumns; column++) {
            var amount = columns.eq(column + 1).find("font").eq(1).text();
            if (amount == "" || amount == null || amount == undefined)
                amount = 0;
            amount = sanitise(amount);
            var kvp = new KeyValuePair(key, amount);
            results[column].dataPoints.push(kvp);
        }
    }

    var included = function (columns) {
        var first = columns.find("b").eq(0).text().toLowerCase();
        var validLength = columns.length == 6;
        var notEmpty = first != "";
        var notWeekSummary = first.indexOf("wk") == -1;
        return validLength && notEmpty && notWeekSummary
    }

    this.generate = function () {
        var rowCount = rows.length - 1;
        var rowsToSkip = 2;
        var counter = 1;
        for (var row = rowsToSkip; row < rowCount; row++) {
            var columns = rows.eq(row).find("td");
            if (included(columns))
            {
                createColumnData(columns, this.results, counter);
                counter++;
            }
        }
        return this.results;
    }
}



module.exports = TableData;