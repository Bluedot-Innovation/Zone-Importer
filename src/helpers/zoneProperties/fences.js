var randomColor = require('randomcolor'); // import the script

const FENCE_TYPES = {
    circle: 'circles',
    rectangle: 'rectangles',
    polygon: 'polygons',
    geoline: 'polylines',
}

module.exports = (zone, cellData) => {
    let fences = {
        circles: [],
        rectangles: [],
        polygons: [],
        polylines: [],
    };
    const csvFormattedFences = cellData.split('|');

    if (csvFormattedFences.length > 5) {
        console.error(`'${zone.zoneName}' has more than 5 fences. Please reduce the number of fences.`)
        process.exit(1);
    }

    // Take each fence, translate it to the shape the API expects, and push into
    // the fences object above.
    csvFormattedFences.forEach(fence => {
        const prefix = fence.split(';')[0];
        const fenceType = FENCE_TYPES[prefix];
        const apiReadyFence = handle[fenceType](fence);
        fences[fenceType].push(apiReadyFence);
    })

    // Remove any fence types that are empty
    filterEmptyArrays(fences);

    zone.fences = fences;
}

const handlePoly = (name) => (polygon) => {
    const [prefix, ...csvVertices] = polygon.split(';');
    const vertices = csvVertices.map(vertex => convertLatLngToObject(vertex));

    return {
        name,
        color: randomColor(),
        vertices,
    }
};

const handle = {
    rectangles: (rectangle) => {
        const northEast = rectangle.split(';')[1];
        const southWest = rectangle.split(';')[2];

        return {
            name: 'Rectangle',
            color: randomColor(),
            // "order": 1,
            northEast: convertLatLngToObject(northEast),
            southWest: convertLatLngToObject(southWest),
        }
    },
    circles: (circle) => {
        const radius = circle.split(';')[1];
        const center = circle.split(';')[2];

        return {
            name: 'Circle',
            color: randomColor(),
            radius,
            center: convertLatLngToObject(center),
        }
    },
    polygons: handlePoly('Polygon'),
    polylines: handlePoly('Geoline'),
}

const convertLatLngToObject = (latLng) => {
    const split = latLng.split(' ');
    return {
        latitude: split[0],
        longitude: split[1],
    }
}

const filterEmptyArrays = (obj) => {
    Object.keys(obj).forEach(key => {
        if (!obj[key].length) {
            delete obj[key];
        }
    })
}
