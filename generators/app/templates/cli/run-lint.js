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
    let lint = function (sources) {
        return [
            'eslint', '--config', '.eslintrc.json'
        ].concat(sources, process.argv.slice(2));
    }
    if (code === 0) {
        ps.spawn('npx', lint(["'lib/**/*.js'", "'test/**/*.js'"]), {
            shell: true, stdio: 'inherit'
        }).on('exit', function (code) {
            process.exit(code);
        });
    } else {
        process.exit(code);
    }
}

fs.access('./node_modules', npm_install);
