const { npm, npx } = require('./run-utils');
const { exit } = require('process');

const jsdoc = () => npx('jsdoc',
    '--configure', 'jsdoc.json', 'dist/lib/index.js'
);
if (require.main === module) {
    npm('install')
        .then(() => require('./run-clean')('docs'))
        .then(() => require('./run-build')())
        .then(jsdoc).catch(exit);
}
module.exports = jsdoc;
