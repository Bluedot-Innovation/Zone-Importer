var request = require('request');
const logger = require('./logger');

module.exports = function postToApi(requests) {
    let errored = 0;
    let succeeded = 0;

    return new Promise((resolve, reject) => {
        const interval = setInterval(function() {
            if ( !requests.length) {
                clearInterval(interval);
                resolve({errored, succeeded});
                return;
            }

            var nextRequest = requests.pop();

            request(nextRequest, function(error, response, body) {
                const hasErrors = Boolean(body.error);

                if (hasErrors) {
                    errored++;
                    const zoneName = nextRequest.json.content.zone.zoneName;
                    logger.error(zoneName, body.error);
                } else {
                    succeeded++;
                    console.log(`'${body.name}' was successfully uploaded.`);
                }
            });
        }, 1500);
    });
}
