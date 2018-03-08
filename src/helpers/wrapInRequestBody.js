const { ZONES_POST_ENDPOINT } = require('../constants');
const { CUSTOMER_API_KEY, API_KEY } = process.env;
const security = {
    customerApiKey: CUSTOMER_API_KEY,
    apiKey: API_KEY
};

/**
 * wrapInRequestBody -
 * Wrap the zone in preparation for making the ajax call
 */
module.exports = function wrapInRequestBody(zones) {
    return zones.map(zone => (
        {
            url: ZONES_POST_ENDPOINT,
            method: "POST",
            json: {
                security,
                content: {
                    zone
                }
            }
        }
    ));
}
