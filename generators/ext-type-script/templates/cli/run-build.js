const { arg, install, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    return arg('lint') ? run('npm', 'run', 'lint') : null;
}
function run_build() {
    return run('node', './node_modules/typescript/bin/tsc');
}
function run_babel() {
    const babel = (...args) => [
        './node_modules/babel-cli/bin/babel.js', '--presets=env'
    ].concat(args);
    return run('node', ...babel('-qsd', 'dist', 'dist'));
}

install('./node_modules')
    .then(run_lint).then(run_build).then(run_babel).catch(exit);
