const logger = require('./logger');

module.exports = (data) => {
    const header = data[0];
    const requiredColumns = ['zoneName', 'minimumRetriggerTime'];
    const recognizedColumns = [
        'timeActive',
        'activeAllDay',
        'enableCheckOut',
        'messageActions',
        'customActions',
        'fences',
        ...requiredColumns,
    ];

    // Give errors if missing fields
    requiredColumns.forEach((requiredColumn) => {
        if (!header.includes(requiredColumn)) {
            logger.error(`${requiredColumn} is a required column.`);
            process.exit(1);
        }
    })

    header.forEach(headerItem => {
        const isRecognizedColumn = recognizedColumns.includes(headerItem);
        if (!isRecognizedColumn) {
            logger.error(`${headerItem} is not a recognized column.`);
            process.exit(1);
        }
    });

    return data;
}
