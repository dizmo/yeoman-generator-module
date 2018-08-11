const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const lint = () => npx(
    'coffeelint', '-qf', 'coffeelint.json', 'lib', 'test'
);
if (require.main === module) {
    npm('install').then(lint).catch(exit);
}
module.exports = lint;
