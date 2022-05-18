const path = require('path')
const http = require('http')
const url = require('url')
const sdlr = require(path.join(__dirname, 'libs', 'sdlr'))
const pid = require(path.join(__dirname, 'libs', 'pid'))
const { CFG_HOST, CFG_PORT } = require(path.join(__dirname, 'config'))

//Server handles GET requests
const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        switch (url.parse(request.url).pathname) {
            case '/pid':
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json')
                    response.end(pid.read())
            break
            /*
            case '/api/changeStatus':
                (async() => {
                    //Extracting id
                    const id = url.parse(request.url, true).query.id
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'text/plain')
                    response.end(JSON.stringify(await db.changeStatus(id)))
                })()
            break
            */

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