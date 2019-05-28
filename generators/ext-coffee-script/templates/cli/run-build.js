const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const build = () => Promise.all([
    npx('coffee', '--no-header', '-bco', 'dist/lib', 'lib'),
    npx('coffee', '--no-header', '-bco', 'dist/test', 'test')
]).then(() =>
    npx('babel', '--presets=@babel/env', '--ignore=*.min.js,*.umd.js',
                 '--source-maps=true', '--verbose', // '--quiet',
                 '--out-dir', 'dist', 'dist')
);
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint')(true) ? p.then(require('./run-lint')) : p;
        p = p.then(build);
        p = arg('prepack')(false) ? p.then(require('./run-prepack')) : p;
        p = p.catch(exit);
    });
}
module.exports = build;
