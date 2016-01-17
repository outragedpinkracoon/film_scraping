var fs = require('fs');

var FileService = function FileUtils() { }

FileService.prototype = {
    writeFile: function writeFile(fileName, contents, callback) {
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

module.exports = FileService;