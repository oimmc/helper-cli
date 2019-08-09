const program = require('commander')

program
    .version(require('../package.json').version, '-v --version')
    .usage('<command> [options]')
