/**
 * Created by alex on 8/22/16.
 */
(function () {
    var config = require('./config.defaults.js');

    //all the config here is to override the default configurations in 'config.defaults.js'

    config.env = 'product';
    // config.hostname = 'product.example';
    // config.mongo.db = 'example_product';

    module.exports = config;
})();