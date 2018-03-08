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
    if (!zone.actions) {
        zone.actions = {};
    }

    zone.actions.customActions = [
        {
            name: 'Notify application - '
        }
    ]


    // This code allows the user to add custom actions in the csv file. Disabled
    // for now, and default above is used.
    // if (cellData) {
    //     if (!zone.actions) {
    //         zone.actions = {};
    //     }
    //
    //     const split = cellData.split(';');
    //     const [name, ...keyValuePairs] = split;
    //     const customFields = convertKeyValueArrayToObjects(keyValuePairs);
    //
    //     zone.actions.customActions = [
    //         {
    //             name,
    //             customFields,
    //         }
    //     ]
    // }
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
