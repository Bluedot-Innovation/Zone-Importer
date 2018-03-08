module.exports = function timeActive(zone, cellData) {
    if (cellData) {
        const [from, to] = cellData.split(';')

        zone.timeActive = {
            from: rationalise(from),
            to: rationalise(to),
        }
    } else {
        zone.activeAllDay = true;
    }
}

// Converts 24hr to 12hr time
function rationalise(input) {
    let period = 'am';
    let time = input;
    if( input.substr(0, 2).match(/[0-9][0-9]/) && input.substr(0, 2) > 12 )
    {
        period = 'pm';
        time = String(input.substr(0, 2)-12)+input.substr(2);
    }
    let result = { time, period };
    return result;
}
