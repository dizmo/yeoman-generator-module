const { npm, npx } = require('./run-utils');
const { exit } = require('process');

const jsdoc = () => new Promise((resolve, reject) => {
    require('tmp').dir(async (e, path, cleanup) => {
        if (e) {
            return reject(e);
        }
        try {
            await npx('coffee', '-cbo', path, 'lib');
        } catch (e) {
            return reject(e);
        }
        try {
            await npx('jsdoc', '-c', 'jsdoc.json', path);
        } catch (e) {
            return reject(e);
        }
        cleanup();
        resolve();
    });
});
if (require.main === module) {
    npm('install')
        .then(() => require('./run-clean')('docs'))
        .then(jsdoc).catch(exit);
}
module.exports = jsdoc;
