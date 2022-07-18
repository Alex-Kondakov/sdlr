const path = require('path')
const fs = require('fs')

//Reading script file. Returns stringified JSON
exports.read = scriptFile => scriptFile ? fs.readFileSync(path.join(__dirname, '..', 'scripts', scriptFile), 'utf8') : ''

//Writing to script file
exports.write = (scriptFile, data) => scriptFile ? fs.writeFileSync(path.join(__dirname, '..', 'scripts', scriptFile), data) : ''
