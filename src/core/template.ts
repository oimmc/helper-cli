// const exec = require('child_process').exec
// import downloadGit from 'download-git-repo'
const downloadGit = require('download-git-repo')

export const downloadTemplate = async (projectName: string, repo: string) => {
    return new Promise((resolve, reject) => {
        downloadGit(repo, projectName, (err: any) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}
