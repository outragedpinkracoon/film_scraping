var KeyValuePair = require('../keyValuePair');

var TableData = function ($, headers,rows) {
    this.generate = function () {
        var results = headers;
        var rowCount = rows.length - 1;
        var rowsToSkip = 2;
        var maxColumns = 5;
        
        for (var row = rowsToSkip; row < rowCount; row++) {
            var elements = rows.eq(row).find("td");
            for (var column = 0; column < maxColumns; column++) {
                var amount = elements.eq(column + 1).find("font").eq(1).text();
                var kvp = new KeyValuePair(column, amount);
                kvp.value = amount;
                kvp.key = column;
                results[column].dataPoints.push(kvp);
            }
        }
        return results;
    }
}

module.exports = TableData;