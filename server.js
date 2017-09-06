'use strict';

const firestarter = require('firestarter')({
    port: 4000,
    shutdownTimeout: 8,
    startupTimeout: 8,
    maxConnectionTime: 4,
    maxSocketTime: 4,
    exUser: {
        switchOnReady: true,
        targetUser: 'node',
        targetGroup: 'node'
    },
    memwatch: {
        enabled: false
    },
    proxyProtocol: false,
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
