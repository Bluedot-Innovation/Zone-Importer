exports.messageActions = (zone, cellData) => {
    if (cellData) {
        if (!zone.actions) {
            zone.actions = {};
        }

        const split = cellData.split(';');
        const [title, message] = split;

        zone.actions.messageActions = [
            {
                name: 'notification',
                title,
                message,
            }
        ]
    }
}

exports.customActions = (zone, cellData) => {
    console.log('zone',zone)
    console.log('cellData',cellData)
    if (!zone.actions) {
        zone.actions = {};
    }

    if (cellData) {
        if (!zone.actions) {
            zone.actions = {};
        }

        const split = cellData.split(';');
        const [name, ...keyValuePairs] = split;
        const customFields = convertKeyValueArrayToObjects(keyValuePairs);

        zone.actions.customActions = [
            {
                name,
                customFields,
            }
        ]
    } else {
        zone.actions.customActions = [{ name: 'Notify application - ' }]
    }
}

/**
 * convertKeyValueArrayToObjects -
 * Converts: ['foo1', 'bar1', 'foo2', 'bar2']
 * to: [{key: 'foo1', value: 'bar1'}, {key: 'foo2', value: 'bar2'}]
 */
function convertKeyValueArrayToObjects(arr, objArr = []) {
    if (!arr.length) {
        return objArr;
    }

    const [key, value, ...otherKeyValues] = arr;

    return convertKeyValueArrayToObjects(
        otherKeyValues,
        [
            ...objArr,
            {key, value}
        ]
    )
}
