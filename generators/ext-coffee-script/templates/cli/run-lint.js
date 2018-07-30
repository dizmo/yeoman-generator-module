let ps = require('child_process'),
    fs = require('fs');

function npm_install(flag) {
    if (flag) {
        ps.spawn('npm', ['install'], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npx_eslint(code);
        });
    } else {
        npx_eslint(0);
    }
}

function npx_eslint(code) {
    if (code === 0) {
        ps.spawn('npx', [
            'coffeelint', '--file', 'coffeelint.json', '--quiet', 'lib/*.coffee'
        ].concat(process.argv.slice(2)), {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            process.exit(code);
        });
    } else {
        process.exit(code);
    }
}

fs.access('./node_modules', npm_install);
