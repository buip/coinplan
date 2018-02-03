
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Module dependencies.
 */

const app = require('../server/app');
const http = require('http');

// const serverPort = require('../server/config').serverPort;
const serverPort = normalizePort(process.env.PORT || '3000');


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(serverPort);
app.set('port', port);


/**
 * Create HTTP server.
 */

const server = http.createServer(app);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            // log(`${bind} requires elevated privileges`, 'error', true);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            // log(`${bind} is already in use`, 'error', true);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    // log(`Listening on ${bind}`);
}


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);