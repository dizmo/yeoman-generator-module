const { arg, install, run } = require('./lib-utils');
const { exit } = require('process');

function run_build() {
    return arg('build')
        ? run('npm', 'run', '--', 'build', arg('lint', '--lint', '--no-lint'))
        : null;
}
function run_mocha() {
    return run('node', arg('cover', './node_modules/nyc/bin/nyc'), 
        './node_modules/mocha/bin/mocha', 'dist/test');
}

install('./node_modules')
    .then(run_build).then(run_mocha).catch(exit);
