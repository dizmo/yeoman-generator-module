const { bin, npm, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    return run('node', ...tslint('"lib/**/*.ts"', '"test/**/*.ts"'));
}
const tslint = (...args) => [
    bin('tslint'), '--config', 'tslint.json'
].concat(args);

if (require.main === module) {
    npm('install').then(run_lint).catch(exit);
}
module.exports = {
    run_lint: run_lint
};
