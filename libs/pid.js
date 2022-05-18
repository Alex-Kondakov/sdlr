const path = require('path')
const fs = require('fs')

//Reading pid file. Returns stringified JSON
exports.read = () => fs.readFileSync(path.join(__dirname, '..', 'pid'), 'utf8')

//Writing to pid file
exports.write = pid => {
    fs.writeFileSync(path.join(__dirname, '..', 'pid'), JSON.stringify(pid))
}