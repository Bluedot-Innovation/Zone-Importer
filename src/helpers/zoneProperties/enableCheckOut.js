module.exports = (zone, cellData) => {
    if (cellData === 'false') {
        zone.enableCheckOut = false;
    } else {
        zone.enableCheckOut = Boolean(cellData);
    }
}
