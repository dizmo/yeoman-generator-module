const { arg, install, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    return arg('lint') ? run('npm', 'run', 'lint') : null;
}
function run_babel() {
    let babel = (...args) => [
        './node_modules/babel-cli/bin/babel.js', '--presets=env', '-qs'
    ].concat(args);
    return Promise.all([
        run('node', ...babel('-d', 'dist/lib', 'lib')),
        run('node', ...babel('-d', 'dist/test', 'test'))
    ]);
}

install('./node_modules')
    .then(run_lint).then(run_babel).catch(exit);
