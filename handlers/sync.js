const fs = require('fs')
const {spawn} = require('child_process')

const scriptPath = process.argv[2]
const logPath = process.argv[3]

const out = fs.openSync(logPath, 'a');
const err = fs.openSync(logPath, 'a');
const subprocess = spawn('ls -la /Users/deadtoto/Desktop/projects', [], {
    detached: true,
    shell: true,
    stdio: ['ignore', out, err]
 })
subprocess.unref()