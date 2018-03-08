var csv = require('csv');

module.exports = function parseCsv(file) {
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
