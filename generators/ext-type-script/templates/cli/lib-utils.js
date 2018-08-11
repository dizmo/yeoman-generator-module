const { access } = require('fs');
const { promisify } = require('util');
const { spawn } = require('child_process');

const arg = (key, lhs, rhs) => {
    const y = require('yargs')
        .default('lint', true)
        .default('build', true)
        .default('cover', false);
    return y.argv[key]
        ? lhs !== undefined ? lhs: y.argv[key] : rhs;
};
const npm = (...args) => promisify(access)
    ('node_modules').catch(() => run('npm', ...args));
const npx = (cmd, ...args) => fqn[cmd]
    ? run('node', fqn[cmd], ...args)
    : run('npx', '-q', cmd, ...args);
const run = (cmd, ...args) => new Promise(
    (res, rej) => spawn(cmd, args, {
        shell: true, stdio: 'inherit'
    }).on('exit', code =>
        code === 0 ? res(code) : rej(code)
    )
);
const fqn = {
    'babel': 'node_modules/babel-cli/bin/babel.js',
    'mocha': 'node_modules/mocha/bin/mocha',
    'nyc': 'node_modules/nyc/bin/nyc',
    'tsc': 'node_modules/typescript/bin/tsc',
    'tslint': 'node_modules/tslint/bin/tslint',
};
module.exports = {
    arg: arg, npm: npm, npx: npx, run: run
};
