require("dotenv-safe").config();
const fs = require("fs");
const util = require("util");
const promptFilename = require('./helpers/promptFilename');
const parseCsv = require("./helpers/parseCsv");
const validateHeaderColumns = require("./helpers/validation");
const constructZones = require("./helpers/constructZones");
const wrapInRequestBody = require("./helpers/wrapInRequestBody");
const postToApi = require("./helpers/postToApi");
const displayResult = require("./helpers/displayResult");
const logger = require("./helpers/logger");
const { pipe } = require("ramda");

const filename = process.argv[2];
var file = fs.readFileSync(filename, { encoding: "utf8" });

parseCsv(file)
    .then(pipe(
        validateHeaderColumns,
        constructZones,
        wrapInRequestBody,
        postToApi,
    ))
    .then(displayResult)
    .catch(console.error);
