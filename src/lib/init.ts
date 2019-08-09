// import util from 'util'
import inquirer from 'inquirer'
import symbol from 'log-symbols'
import chalk from 'chalk'
import ora from 'ora'
import fs from 'fs'
import { downloadTemplate } from './template'

const init = (projectName: string) => {
    inquirer
        .prompt([
            {
                name: 'description',
                message: 'Enter the project description: '
            },
            {
                name: 'author',
                message: 'Enter the project author: '
            }, {
                type: 'confirm',
                name: 'typescript',
                message: 'Add typescript ?',
                default: true
            }
        ]).then(async answers => {
            // console.log(`\n${JSON.stringify(answers,  null, '\t')}\n`)

            // let repo = answers.typescript ? 'wangyajundev/fe-helper' : 'wangyajundev/fe-webpack4-vue'
            let repo = answers.typescript ? '/wangyajundev/helper-cli/blob/master/src/templates/fe-helper' : 'wangyajundev/fe-webpack4-vue'
            let loading = ora(`downloading template[https://github.com/${repo}] \n`)
            loading.start()
            loading.color = 'yellow'

            downloadTemplate(projectName, repo).then(
                () => {
                    loading.succeed()
                    const pkg = `${projectName}/package.json`
                    if (fs.existsSync(pkg)) {
                        const data = fs.readFileSync(pkg).toString()
                        let json = JSON.parse(data)

                        json.name = projectName
                        json.author = answers.author
                        json.description = answers.description

                        fs.writeFileSync(
                            pkg,
                            JSON.stringify(json, null, '\t'),
                            'utf-8'
                        )

                        console.log(symbol.success, chalk.green('Completed !\n'))

                        console.log(`    cd ${projectName}\n`)
                        console.log('    npm install\n')
                        console.log('    npm start\n')
                    }
                },
                (err) => {
                    console.log(err)
                    loading.fail()
                }
            )

        })
}

module.exports = init
