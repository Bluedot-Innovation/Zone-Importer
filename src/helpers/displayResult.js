const { red, green } = require('colors/safe');

module.exports = function displayResult({errored, succeeded}) {
    console.log(green(`Succeeded: ${succeeded}`));
    console.log(red(`Errored: ${errored}`));
    console.log();
}
