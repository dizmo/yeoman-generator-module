const { arg, bin, npm, run } = require('./lib-utils');
const { run_build } = require('./run-build');
const { run_lint } = require('./run-lint');
const { exit } = require('process');

function run_cover() {
    return run('node', bin('nyc'), bin('mocha'), 'dist/test');
}
function run_test() {
    return run('node', bin('mocha'), 'dist/test');
}

if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(run_lint) : p;
        p = arg('build') ? p.then(run_build) : p;
        p = arg('cover') ? p.then(run_cover) : p.then(run_test);
        p.catch(exit);
    }).catch(exit);
}
module.exports = {
    run_cover: run_cover, run_test: run_test
};
