var csv = require('csv');
const fs = require("fs");

module.exports = function parseCsv(filename) {
    var file = fs.readFileSync(filename, { encoding: "utf8" });

    return new Promise((resolve, reject) => {
        csv.parse(file, function(err, data) {
            if( err ) {
                console.log(err);
                process.exit(1);
            }

            resolve(data);
        });
    })
}
