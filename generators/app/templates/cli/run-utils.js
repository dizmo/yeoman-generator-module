const { access } = require('fs').promises;
const { spawn } = require('child_process');

const arg = (key, lhs, rhs) => value => {
    const val = require('yargs').default(key, value).argv[key];
    return val ? lhs !== undefined ? lhs : val : rhs;
}
const run = (command, ...args) => new Promise(
    (resolve, reject) => spawn(command, args, {
        shell: true, stdio: 'inherit'
    }).on('exit', code =>
        (code === 0 ? resolve : reject)(code)
    )
);
const npx = (...args) =>
    run('npx', '-q', ...args);
const npm = (...args) => access('node_modules')
    .catch(() => run('npm', ...args));
module.exports = {
    arg, npm, npx, run
};
