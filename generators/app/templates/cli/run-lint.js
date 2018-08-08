const { install, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    const lint = (...args) => [
        'eslint', '--config', '.eslintrc.json'
    ].concat(
        args, process.argv.slice(2) // e.g. `--fix`!
    );
    return Promise.all([
        run('npx', ...lint('"lib/**/*.js"')),
        run('npx', ...lint('"test/**/*.js"'))
    ]);
}

install('./node_modules')
    .then(run_lint).catch(exit);
