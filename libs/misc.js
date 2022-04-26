const fs = require('fs')


//Grab file names with chosen extension. Mask is array of extensions like ['rar', 'zip', '7z'] in lower case. If you need to grab everything in folder, omit the second parameter.
exports.glob = (dir, mask=null) => {
    let files = fs.readdirSync(dir, {withFiletypes: true})
    return (mask) ? files.filter(file => mask.includes(file.split('.').pop().toLowerCase())) : files
}

//Checking if passed string JSON or not
exports.isJson = (input) => {
    try {
        JSON.parse(input)
    } 
    catch (err) {
        return false
    }
    return true
}