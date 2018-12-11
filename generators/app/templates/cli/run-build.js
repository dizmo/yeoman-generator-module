const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const build = () => Promise.all([
    npx('babel', '--presets=env', '-qsd', 'dist/lib', 'lib'),
    npx('babel', '--presets=env', '-qsd', 'dist/test', 'test')
]);
const browserify = () => Promise.all([
    npx('browserify', 'dist/lib/index.js', '-ds', '<%= name.replace("@", "").replace("/", "-") %>',
        '|', 'exorcist', 'dist/lib/index.umd.js.map',
        '>', 'dist/lib/index.umd.js')
]);
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint')(true) ? p.then(require('./run-lint')) : p;
        p.then(build).then(browserify).catch(exit);
    });
}
module.exports = build;
