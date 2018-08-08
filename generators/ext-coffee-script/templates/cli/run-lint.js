const { install, run } = require('./run-util');
const { exit } = require('process');

function run_lint() {
    const lint = (...args) => [
        'coffeelint', '--file', 'coffeelint.json', '--quiet'
    ].concat(
        args, process.argv.slice(2)
    );
    return Promise.all([
        run('npx', ...lint('lib')),
        run('npx', ...lint('test'))
    ]);
}

install('./node_modules')
    .then(run_lint).catch(exit);
