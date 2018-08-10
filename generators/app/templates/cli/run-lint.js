const { arg, bin, npm, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    return run('node', ...eslint('"lib/**/*.js"', '"test/**/*.js"'));
}
const eslint = (...args) => [
    bin('eslint'), '--config', '.eslintrc.json'
].concat(args, arg('fix', '--fix'));

if (require.main === module) {
    npm('install').then(run_lint).catch(exit);
}
module.exports = {
    run_lint: run_lint
};
