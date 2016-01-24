var KeyValuePair = require('../keyValuePair');

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

module.exports = TableData;