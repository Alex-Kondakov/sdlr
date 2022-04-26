const path = require('path')
const fs = require('fs')
const misc = require('./libs/misc')

console.log(`SDLR PID: ${process.pid}`)

/*
while (true) {
    //Receiving all scripts files names
    const scripts = misc.glob(path.join(__dirname, 'scripts'))

    //Reading scripts
    for (i = 0; i < scripts.length; i++) {
        const currentScript = fs.readFileSync(path.join(__dirname, 'scripts', scripts[i]), 'utf8')
        if (misc.isJson(currentScript)) {
            console.log(`${scripts[i]} IS JSON`)
        } else {
            console.log(`${scripts[i]} IS NOT A JSON`)
        }
    }
}
*/