#! /usr/bin/env node

const program = require('commander')

program
    .version(require('../package.json').version, '-v --version')
    .usage('<command> [options]')

program
    .command('init <app-name>')
    .alias('i')
    .description('init a new project')
    .action((name) => {
        require('../build/init')(name)
    })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
}
