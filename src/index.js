require('dotenv-safe').config();
const { CSV_FILE_NAME } = process.env;
const fs = require('fs');
const util = require('util')
const parseCsv = require('./helpers/parseCsv');
const validateHeaderColumns = require('./helpers/validation');
const constructZones = require('./helpers/constructZones');
const wrapInRequestBody = require('./helpers/wrapInRequestBody');
const postToApi = require('./helpers/postToApi');
const displayResult = require('./helpers/displayResult');
const logger = require('./helpers/logger');
const { pipe } = require('ramda');

var filename = CSV_FILE_NAME;
var file = fs.readFileSync(filename, {encoding: 'utf8'});

parseCsv(file)
    .then(pipe(
        validateHeaderColumns,
        constructZones,
        wrapInRequestBody,
        postToApi
    ))
    .then(displayResult)
    .catch(console.error)
