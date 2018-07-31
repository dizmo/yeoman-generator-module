let ps = require('child_process'),
    fs = require('fs');

function argv(key, value) {
    let argv = require('yargs')
        .default('lint', true)
        .argv;
    if (argv[key] !== undefined) {
        return argv[key];
    } else {
        return value;
    }
}

function npm_install(flag) {
    if (flag) {
        ps.spawn('npm', ['install'], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npm_lint(code);
        });
    } else {
        npm_lint(0);
    }
}

function npm_lint(code) {
    if (code === 0 && argv('lint') === true) {
        ps.spawn('npm', [
            'run-script', '--', 'lint'
        ], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npx_babel(code);
        });
    } else {
        npx_babel(code);
    }
}

function npx_babel(code) {
    let babel = function (source, target) {
        return [
            'babel', source, '-d', target, '--presets=env', '-s'
        ];
    };
    if (code === 0) {
        ps.spawn('npx', babel('lib', 'dist/lib'), {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            if (code === 0) {
                ps.spawn('npx', babel('test', 'dist/test'), {
                    shell: true, stdio: 'inherit'
                }).on('exit', function (code) {
                    process.exit(code);
                });
            } else {
                process.exit(code);
            }
        });
    } else {
        process.exit(code);
    }
}

fs.access('./node_modules', npm_install);
