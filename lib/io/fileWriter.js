var fs = require('fs');

var FileWriter = function () {
    this.writeFile = function writeFile(fileName, contents, callback) {
        var result;
        fs.writeFile(fileName, contents, function (err) {
            if (err) {
                result = err;
            }
            result = "The file was saved!";
            callback(result);
        });
    }
}

module.exports = FileWriter;