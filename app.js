(function() {
    'use strict';

    //Express
    var express = require('express');
    var app = express();
    var port = process.env.PORT || 3000;
    var myMongo = require('./backend/dbConnect.js');
    var logger=require('./util/logger.js');

    //Passport
    var passport = require('passport');
    require('./backend/authSrv/passport')(passport); // pass passport for configuration

    app.use(require('morgan')('combined'));
    app.use(express.static(__dirname + '/frontend'));

    //Cookie and session
    //Todo: maybe (not sure) passportjs need cookie parser.
    //var cookieParser = require('cookie-parser');  //disable cookie parser since express-session don't need it.
    //app.use(cookieParser());
    var session = require('express-session');
    app.use(session({
        secret: 'this is the secret',
        cookie: {
            httpOnly: true,
            maxAge:  5*60*1000
        },
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //Body-parser
    var bodyParser = require('body-parser');
    app.use(bodyParser.json()); //for parsing application/json
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //Load .env file
    //var dotenv = require('dotenv').authClient({path: './sample.env'});
    //dotenv.load({path: './sample.env'});

    // routes ======================================================================
    require('./backend/authSrv/authSrv.routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

    console.log("__dirname is " + __dirname);
    app.all('/*', function(req, res) {
      res.sendFile('/frontend/index.html', {root: __dirname});
    });

    //It’s best to just exit and have your service manager/monitor restart the process.
    process.on('uncaughtException', function (er) {
        logger.fatal({err: er}, "the application is going down for the uncaughtException.");
        process.exit(1);
    });

    myMongo.mongoDBinit(function(err) {
        if(err) {
            logger.error({err: err}, "App failed to get started because it failed to connect to database");
        }else{
            logger.info("Connected to MongoDB database : " + myMongo.langExDB.databaseName);

            app.listen(port, function() {
                logger.info("This env is for " + process.env.NODE_ENV);
                logger.info("LangExchange app listening on port : " + port);
            });
        }
    });

    //app.listen(3000);
})();