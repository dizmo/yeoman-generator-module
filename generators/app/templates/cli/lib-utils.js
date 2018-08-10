const { access } = require('fs');
const { promisify } = require('util');
const { spawn } = require('child_process');

function arg(key, lhs, rhs) {
    const y = require('yargs')
        .default('lint', true)
        .default('build', true)
        .default('cover', false);
    return y.argv[key]
        ? lhs !== undefined ? lhs : y.argv[key] : rhs;
}
function bin(cmd, lhs, rhs) {
    return `node_modules/${lhs?lhs(cmd):cmd}/bin/${rhs?rhs(cmd):cmd}`;
}
function npm(...args) {
    return promisify(access)('node_modules').catch(
        () => run('npm', ...args)
    );
}
function run(cmd, ...args) {
    return new Promise((res, rej) => spawn(cmd, args, {
        shell: true, stdio: 'inherit'
    }).on('exit', code =>
        code === 0 ? res(code) : rej(code)
    ));
}

module.exports = {
    arg: arg, bin: bin, npm: npm, run: run
};
