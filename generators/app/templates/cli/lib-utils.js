const { access } = require('fs');
const { promisify } = require('util');
const { spawn } = require('child_process');

const arg = (key, lhs, rhs) => {
    const y = require('yargs')
        .default('lint', true)
        .default('build', true)
        .default('cover', false);
    return y.argv[key]
        ? lhs !== undefined ? lhs : y.argv[key]
        : rhs !== undefined ? rhs : y.argv[key];
};
const run = (cmd, ...args) => new Promise(
    (res, rej) => spawn(cmd, args, {
        shell: true, stdio: 'inherit'
    }).on('exit', code =>
        code === 0 ? res(code) : rej(code)
    )
);

const npx = (...args) => run('npx', '-q', ...args);
const npm = (...args) => promisify(access)
    ('node_modules').catch(() => run('npm', ...args));
    
module.exports = {
    arg: arg, npm: npm, npx: npx, run: run
};
