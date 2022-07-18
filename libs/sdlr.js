const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const misc = require(path.join(__dirname, 'misc'))
const pid = require(path.join(__dirname, 'pid'))
const script = require(path.join(__dirname, 'script'))
const { CFG_ITERATIONS_INTERVAL } = require(path.join(__dirname, '..', 'config'))

//SDLR start
exports.start = () => {
    console.log(`SDLR PID: ${process.pid}\n`)
    pid.write(process.pid)

    setInterval(() => {
        //Browsing through scripts and comparing scripts scheduling settings with current date and time
        //Receiving all scripts file names first
        const scripts = misc.glob(path.join(__dirname, '..', 'scripts'))
        //Reading scripts
        for (let i = 0; i < scripts.length; i++) {
            const currentScript = script.read(scripts[i])
            //Proceed if current script is valid JSON
            if (misc.isJson(currentScript)) {
                //Parsing script settings
                const currentScriptObj = JSON.parse(currentScript)
                const {schedule, mode} = currentScriptObj
    
                //Receiving current date and time in required format
                const now = new Date()
                const year = now.getFullYear().toString()
                const month = ('0' + (now.getMonth() + 1)).slice(-2)
                const day = ('0' + now.getDate()).slice(-2)
                const hours = ('0' + now.getHours()).slice(-2)
                const minutes = ('0' + now.getMinutes()).slice(-2)
                const seconds = ('0' + now.getSeconds()).slice(-2)
    
                //Checking if current time is the time for execution
                if (schedule.includes(`${hours}:${minutes}:${seconds}`)) {
                    //Checking if there was no script execution for current timestamp earlier
                    const logPath = path.join(__dirname, '..', 'logs', scripts[i], year, month, day, hours + ':' + minutes + ':' + seconds)
                    //New dir for log if it doesn't exists already
                    misc.newDir(path.join(__dirname, '..', 'logs', scripts[i], year, month, day))
                    if (!fs.existsSync(logPath)) {
                        try {
                            //Subprocess handler full path, depending of execution mode
                            const handlerPath = path.join(__dirname, '..', 'handlers', `${mode.toLowerCase()}.js`)
                            //Current script full path
                            const scriptPath = path.join(__dirname, '..', 'scripts', scripts[i])
                            //New Log
                            const message = `${hours}:${minutes}:${seconds} console: "node ${handlerPath} ${scriptPath} ${logPath}"`
                            fs.writeFileSync(logPath, message + '\n\n')
                            //Run script handler as standalone process
                            const handler = spawn('node', [handlerPath, scriptPath, logPath], {
                                detached: true,
                                stdio: 'ignore'
                            })
                            handler.unref()
                            //Message to console
                            console.log(message + '\n')
                        }
                        catch(e) {
                            const error = `${hours}:${minutes}:${seconds} index.js: ${e.toString()}`
                            fs.writeFileSync(logPath, error)
                            console.log(error)
                        }
                    }
                }
            }
        }
    
    }, CFG_ITERATIONS_INTERVAL)
}