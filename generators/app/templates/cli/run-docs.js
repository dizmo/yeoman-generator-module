const { npm, npx } = require('./run-utils');
const { exit } = require('process');

const jsdoc = () => npx('jsdoc',
    '--configure', 'jsdoc.json'
);
if (require.main === module) {
    npm('install')
        .then(() => require('./run-clean')('docs'))
        .then(jsdoc).catch(exit);
}
module.exports = jsdoc;
