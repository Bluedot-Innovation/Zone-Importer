const { red, green } = require('colors/safe');
const util = require('util');

const logger = {
    error: (...messages) => {
        drawLine(red);
        console.log(red('Error:'))
        messages.forEach(message => {
            console.log(red(util.inspect(message, { showHidden: false, depth: null })));
        })
        drawLine(red);
        console.log('');
    },

    success: (...messages) => {
        drawLine(green);
        messages.forEach(message => {
            console.log(green(message));
        });
        drawLine(green);
        console.log('');
    }
}

function drawLine(color) {
    console.log(color('========================================================================================'));
}

module.exports = logger;
