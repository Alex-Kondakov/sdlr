const path = require('path')
const fs = require('fs')
const misc = require('./libs/misc')
const {CFG_ITERATIONS_INTERVAL} = require('./config')

console.log(`SDLR PID: ${process.pid}`)


//Scripts checking start
const intervalObj  = setInterval(() => {
    //Receiving current date and time
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()

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
            if (schedule.length > 0) {
                /*
                for (j = 0; j < schedule.length; i++) {
                    const timeForExecution = schedule[j].split(':')
                    if ((parseInt(timeForExecution[0]) == hours) && (parseInt(timeForExecution[1]) == minutes)) {
                        //Check if this script has been executed already on this timing
                        console.log(`RUN RUN RUN at ${schedule[j]}`)
                    }
                }
                */
                console.log(`${Date.now()}: ${scripts[i]}`)
            }
        }
    }

}, CFG_ITERATIONS_INTERVAL)