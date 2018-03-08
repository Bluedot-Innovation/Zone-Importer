const util = require('util')
const timeActive = require('./zoneProperties/timeActive');
const enableCheckOut = require('./zoneProperties/enableCheckOut');
const fences = require('./zoneProperties/fences');
const actions = require('./zoneProperties/actions');

module.exports = function constructZones(data) {
    const [headerRow, ...rows] = data;

    // Adding a method name that matches a header name will cause the method to run
    // over the data instead of attaching the data directly to the zone object
    const customProcess = Object.assign({}, actions, {
        fences,
        enableCheckOut,
        timeActive,
    })

    const zones = rows.map(row => {
        const get = getFromColumn.bind(null, headerRow, row);
        let zone = {};

        // For each header cell, add the matching data from that row, or call
        // the function to process the data
        headerRow.forEach(columnName => {
            const cellData =  get(columnName);
            const cellNotEmpty = Boolean(cellData);
            const needsCustomProcessing = Boolean(customProcess[columnName]);

            if (needsCustomProcessing) {
                customProcess[columnName](zone, cellData);
            } else if (cellNotEmpty) {
                zone[columnName] = cellData;
            }
        });

        // console.log(util.inspect(zone, { showHidden: true, depth: null }))

        return zone;
    })

    return zones;
}

// Find the column with the matching columnName, and return that data
function getFromColumn(headerRow, row, columnName) {
    return row[headerRow.indexOf(columnName)];
}


function addRequestBody(zone, security) {
    return {
        security,
        content: {
            zone
        }
    };
}
