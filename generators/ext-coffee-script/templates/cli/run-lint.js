const { bin, npm, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    return Promise.all([
        run('node', ...coffeelint('lib')),
        run('node', ...coffeelint('test'))
    ]);
}
const coffeelint = (...args) => [
    bin('coffeelint'), '--file', 'coffeelint.json', '--quiet'
].concat(args);

if (require.main === module) {
    npm('install').then(run_lint).catch(exit);
}
module.exports = {
    run_lint: run_lint
};
