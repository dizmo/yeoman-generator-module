const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const run_lint = () => npx('tslint', '--config', 'tslint.json',
    '"lib/**/*.ts"', '"test/**/*.ts"', arg('fix', '--fix')
);
if (require.main === module) {
    npm('install').then(run_lint).catch(exit);
}
module.exports = run_lint;
