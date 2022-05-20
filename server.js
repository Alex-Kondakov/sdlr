const path = require('path')
const http = require('http')
const url = require('url')
const sdlr = require(path.join(__dirname, 'libs', 'sdlr'))
const pid = require(path.join(__dirname, 'libs', 'pid'))
const misc = require(path.join(__dirname, 'libs', 'misc'))
const script = require(path.join(__dirname, 'libs', 'script'))
const { CFG_HOST, CFG_PORT } = require(path.join(__dirname, 'config'))

//Server handles GET requests
const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        switch (url.parse(request.url).pathname) {
            //Returns PID of running SDLR
            case '/pid':
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.setHeader('Access-Control-Allow-Origin', '*')
                    response.end(JSON.stringify({
                        status: 200,
                        data: pid.read()
                    }))
            break
            //Returns array of scripts filenames
            case '/scripts':
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.setHeader('Access-Control-Allow-Origin', '*')
                    response.end(JSON.stringify({
                        status: 200,
                        data: misc.glob(path.join(__dirname, 'scripts'))
                    }))
            break
            //Request example: http://localhost:7000/script?file=script.json
            case '/script':
                    //Extracting file name
                    const file = url.parse(request.url, true).query.file
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.setHeader('Access-Control-Allow-Origin', '*')
                    response.end(JSON.stringify({
                        status: 200,
                        data: script.read(file)
                    }))
            break

            default:
                response.statusCode = 404
                response.setHeader('Content-Type', 'text/plain')
                response.end('404 Not found')
            break 
        }
    }
})

server.listen(CFG_PORT, CFG_HOST, () => {
    //SDLR starts
    sdlr.start()
    console.log(`API server is running on http://${CFG_HOST}:${CFG_PORT}`)
})