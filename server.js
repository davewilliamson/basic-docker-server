'use strict';

const firestarter = require('../firestarter')({
    port: 4000,
    spdyPort: 4443,
    shutdownTimeout: 8,
    startupTimeout: 8,
    maxConnectionTime: 4,
    maxSocketTime: 4,
    proxyProtocol: true,
    exUser: {
        switchOnReady: false,
        targetUser: 'node',
        targetGroup: 'node'
    },
    memwatch: {
        enabled: false
    },
    "spdyEnabled": false,
    "spdyOptions": {
        "keyFile": "/keys/blacked-key.pem",
        "certFile": "/keys/blacked-cert.pem",
        "caFile": "/keys/alphaSSL.crt",
        "windowSize": 1048576,
        "plain": false,
        "ssl": true
    },
    name: 'TEST'
});

const configure = require('./configure');
const route = require('./route');
const express = require('express');
const firestarterAppControl = firestarter.eventedStartup();

firestarterAppControl.once('startup', function(app, done) {

    console.log('Startup');

    module.exports = app;

    configure(app)
        .then(route(app))
        .then(done);
});


firestarterAppControl.once('shutdown', function(done) {

    console.log('Shutdown requested!');

    done();
});

firestarterAppControl.once('ready', function() {

    console.log('Ready - press ctrl+c to exit');

});

firestarterAppControl.startup();
