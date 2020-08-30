// this is needed for importing expressjs into our application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const appConfig = require('./configuration/appConfig');
const fs = require('fs');
const cookieParser = require('cookie-parser');

var helmet = require('helmet');
const logger = require('./lib/loggerLib');


//declaring an instance or creating an application instance
const app = express()

app.use(cookieParser())

app.use(helmet())

app.use(bodyParser.json());


// Enabling CORS
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authToken");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//     next();
// });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


// Bootstrap route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        // console.log("including the following file");
        // console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

const server = http.createServer(app)
// start listening to http server
// console.log(appConfig)
server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    require('dns').resolve('www.google.com', function (err) {
        if (err) {
            console.log("No connection");
        }
    });
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    console.log('server listening on port ', addr.port);
    console.log('API end url ', addr);
    logger.info({ Description: 'server listening on port ' + addr.port, listeningPort: addr.port }, 'serverOnListeningHandler', 10, "DEMO")
    // let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true, useCreateIndex: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})