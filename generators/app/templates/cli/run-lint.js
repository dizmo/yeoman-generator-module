const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const lint = () => npx('eslint', '--config', '.eslintrc.json',
    '"lib/**/*.js"', '"test/**/*.js"', arg('fix', '--fix')
);
if (require.main === module) {
    npm('install').then(lint).catch(exit);
}
module.exports = lint;
