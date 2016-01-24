var KeyValuePair = require('../keyValuePair');

var TableData = function ($, headers) {
    this.generate = function () {
        var results = headers;
        var rows = $("table").eq(2).find("tr");
        var rowCount = rows.length - 1;
        for (var row = 2; row < rowCount; row++) {
            var elements = rows.eq(row).find("td");
            for (var column = 0; column < 5; column++) {
                var amount = elements.eq(column + 1).find("font").eq(1).text();
                var kvp = new KeyValuePair();
                kvp.value = amount;
                kvp.key = column;
                results[column].dataPoints.push(kvp);
            }
        }
        return results;
    }
}

module.exports = TableData;