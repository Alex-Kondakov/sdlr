const fs = require('fs')
const {spawn} = require('child_process')

const scriptPath = process.argv[2]
const logPath = process.argv[3]

try {
    //Reading script
    const script = fs.readFileSync(scriptPath, 'utf8')
    const {commands} = JSON.parse(script)

    //Running script commands in sync mode
    for (let i = 0; i < commands.length; i++) {
        const stdout = fs.openSync(logPath, 'a')
        const stderr = fs.openSync(logPath, 'a')
        const subprocess = spawn(commands[i], [], {
            shell: true,
            stdio: ['ignore', stdout, stderr]
        })
    }
}
catch(e) {
    const error = `${hours}:${minutes} async.js: ${e.toString()}`
    fs.appendFileSync(logPath, error)
}