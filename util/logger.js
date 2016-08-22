/**
 * Created by alex on 7/11/16.
 */
(function() {
    'use strict';

    var bunyan = require('bunyan');
    var logger = bunyan.createLogger({
        name: "langExchange",
        stream: process.stdout,
        level: 'info',
        serializers: bunyan.stdSerializers,
    });

    module.exports = logger;
})();