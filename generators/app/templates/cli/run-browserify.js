const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const browserify = () => npx(
    'browserify', 'dist/lib/index.js', '-ds', '<%= name.replace("@", "").replace("/", "-") %>',
        '|', 'exorcist', 'dist/lib/index.umd.js.map',
        '>', 'dist/lib/index.umd.js'
);
if (require.main === module) {
    npm('install').then(browserify).catch(exit);
}
module.exports = browserify;
