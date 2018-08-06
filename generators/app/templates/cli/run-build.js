let cp = require('child_process'),
    ps = require('process'),
    fs = require('fs');

function arg(key, lhs, rhs) {
    let y = require('yargs')
        .default('lint', true);
    return y.argv[key]
        ? lhs !== undefined ? lhs : y.argv[key] : rhs;
}
function run(cmd, ...args) {
    return new Promise((res, rej) => cp.spawn(cmd, args, {
        shell: true, stdio: 'inherit'
    }).on('exit', (code) =>
        code === 0 ? res(code) : rej(code)
    ));
}
function run_install(flag) {
    if (flag) {
        run('npm', 'install')
            .then(run_lint).catch(ps.exit);
    } else {
        run_lint(0);
    }
}
function run_lint() {
    if (arg('lint')) {
        run('npm', 'run-script', 'lint')
            .then(run_babel).catch(ps.exit);
    } else {
        run_babel(0);
    }
}
function run_babel() {
    let babel = (...args) => [
        'babel', '--presets=env', '--quiet', '-s', '-d'
    ].concat(args);
    Promise.all([
        run('npx', ...babel('dist/lib', 'lib')),
        run('npx', ...babel('dist/test', 'test'))
    ]).then(ps.exit).catch(ps.exit);
}

fs.access('./node_modules', run_install);
