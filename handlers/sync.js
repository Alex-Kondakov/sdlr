const fs = require('fs')
const {spawnSync} = require('child_process')

const scriptPath = process.argv[2]
const logPath = process.argv[3]

try {
    //Reading script
    const script = fs.readFileSync(scriptPath, 'utf8')
    const {commands} = JSON.parse(script)

    //Running script commands in async mode
    for (let i = 0; i < commands.length; i++) {
        const stdout = fs.openSync(logPath, 'a')
        const stderr = fs.openSync(logPath, 'a')
        spawnSync(commands[i], [], {
            shell: true,
            stdio: ['ignore', stdout, stderr]
        })
    }
}
catch(e) {
    //Receiving current date and time in required format
    const now = new Date()
    const hours = ('0' + now.getHours()).slice(-2)
    const minutes = ('0' + now.getMinutes()).slice(-2)
    const seconds = ('0' + now.getSeconds()).slice(-2)

    const error = `${hours}:${minutes}:${seconds} sync.js: ${e.toString()}`
    fs.appendFileSync(logPath, error)
}