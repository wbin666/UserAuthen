/**
 * Created by alex on 8/22/16.
 */
(function () {
    var config = require('./config.defaults.js');

    //Notes: Most of development configurations have been set in 'config.defaults.js'
    //    and not need to override them here.
    // config.env = 'development';
    // config.hostname = 'development.example';
    // config.mongo.db = 'example_development';
    
    //so just to add some additional/special configs for development below.

    module.exports = config;
})();