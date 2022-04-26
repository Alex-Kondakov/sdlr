const path = require('path')
const fs = require('fs')
const misc = require('./libs/misc')
const {CFG_ITERATIONS_INTERVAL} = require('./config')

console.log(`SDLR PID: ${process.pid}`)


//Scripts checking start
const intervalObj  = setInterval(() => {
    //Receiving current date and time in required format
    const now = new Date()
    const year = now.getFullYear().toString()
    const month = ('0' + (now.getMonth() + 1)).slice(-2)
    const day = ('0' + now.getDate()).slice(-2)
    const hours = ('0' + now.getHours()).slice(-2)
    const minutes = ('0' + now.getMinutes()).slice(-2)
    const seconds = ('0' + now.getSeconds()).slice(-2)

    //Browsing through scripts and comparing scripts scheduling settings with current date and time
    //Receiving all scripts file names first
    const scripts = misc.glob(path.join(__dirname, 'scripts')) 
    //Reading scripts
    for (i = 0; i < scripts.length; i++) {
        const currentScript = fs.readFileSync(path.join(__dirname, 'scripts', scripts[i]), 'utf8')
        if (misc.isJson(currentScript)) {
            //Parsing script scheduling
            const currentScriptObj = JSON.parse(currentScript)
            const {schedule} = currentScriptObj
            //Checking if current time is time for execution
            if (schedule.includes(`${hours}:${minutes}`)) {
                //Checking if there were no script execution for current timing earlier
                const executionAttemptLogFile = path.join(__dirname, 'logs', scripts[i], year, month, day, hours + ':' + minutes)
                if (!fs.existsSync(executionAttemptLogFile)) {
                    console.log(`Executing ${scripts[i]} at ${hours}:${minutes}, details: ${executionAttemptLogFile}`)
                    misc.newDir(path.join(__dirname, 'logs', scripts[i], year, month, day))
                    /*
                        CREATE CHILD PROCESS HERE
                    */
                    fs.writeFileSync(executionAttemptLogFile, JSON.stringify(
                        {
                            status: 'Success',
                            time: `${hours}:${minutes}:${seconds}`
                        }
                    ))
                }
            }
        }
    }

}, CFG_ITERATIONS_INTERVAL)