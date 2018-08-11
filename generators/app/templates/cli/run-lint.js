const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const run_lint = () => npx('eslint', '--config', '.eslintrc.json',
    '"lib/**/*.js"', '"test/**/*.js"', arg('fix', '--fix')
);
if (require.main === module) {
    npm('install').then(run_lint).catch(exit);
}
module.exports = run_lint;
