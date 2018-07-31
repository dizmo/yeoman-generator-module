let ps = require('child_process'),
    fs = require('fs');

function npm_install(flag) {
    if (flag) {
        ps.spawn('npm', ['install'], {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            npx_coffeelint(code);
        });
    } else {
        npx_coffeelint(0);
    }
}

function npx_coffeelint(code) {
    let lint = function (sources) {
        return [
            'coffeelint', '--file', 'coffeelint.json', '--quiet'
        ].concat(sources, process.argv.slice(2));
    };
    if (code === 0) {
        ps.spawn('npx', lint(['lib/*.coffee', 'test/*.coffee']), {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            process.exit(code);
        });
    } else {
        process.exit(code);
    }
}

fs.access('./node_modules', npm_install);
