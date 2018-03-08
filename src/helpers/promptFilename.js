const fs = require("fs");
var inquirer = require("inquirer");

/**
 * promptFilename -
 * If CSV_FILE_NAME is set in .env, we will use it, otherwise we will
 * prompt the user through the CLI to select a csv from the /csv folder.
 */
module.exports = function promptFilename() {
    const envFilename = process.env.CSV_FILE_NAME;

    if (envFilename) {
        console.log('CSV_FILE_NAME found in .env, importing it.');
        return Promise.resolve(envFilename)
    } else {
        const filenames = fs.readdirSync('csv');

        return inquirer.prompt([
            {
                type: "list",
                name: "csvFilename",
                message: "Which CSV would you like to import?",
                choices: filenames,
            }
        ])
    }
}
