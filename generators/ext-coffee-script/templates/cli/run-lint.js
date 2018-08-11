const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const run_lint = () => npx(
    'coffeelint', '-qf', 'coffeelint.json', 'lib', 'test'
);
if (require.main === module) {
    npm('install').then(run_lint).catch(exit);
}
module.exports = run_lint;
