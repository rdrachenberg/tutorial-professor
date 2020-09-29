// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = mongoose.connection;
const models = require('../models');
// const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");
const { config } = require('dotenv');
const dotenv = require('dotenv');
let loggedIn = require('./config').loggedIn;
// let secret = process.env.SECRET;


module.exports = (app) => {
// ================================================================================    
//************** Mongoose Connect Setup **************//
// ================================================================================
    mongoose.connect("mongodb://localhost:27017/students", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 2500,
    });
    // Set up error log for mongoose error
    db.on('error', function (err) {
        console.log("MONGOOSE ERROR: ", err);
    });
    // Set up successful Mongoose Connnection log
    db.once('open', function () {
        console.log("Mongoose Connection Successful. ");
    });
// ================================================================================
//************** Setup the view engine **************//
// ================================================================================
    app.engine(".hbs", handlebars({
        defaultLayout: "main",
        extname: ".hbs",
    }));
    
    app.set("view engine", ".hbs");
    app.set('views', path.join(__dirname, '../views'));

// ================================================================================
//************** Setup body parser **************//
// ================================================================================
    express.urlencoded({ extended: true }); // not sure if we need this?

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

// ================================================================================
//************** Setup cookie parser **************//
// ================================================================================
    app.use(cookieParser());

// ================================================================================
//************** Setup the static files **************//
// ================================================================================
    app.use(express.static(path.join(__dirname, '../static')));

// ================================================================================
//************** Setup & initialize passport **************//
// ================================================================================
    app.use(passport.initialize());
    // Start passport session
    app.use(passport.session());

// ================================================================================
//***** Setup custom middleware for jwt cookie verification and storage *****//
// ================================================================================
    app.use((req, res, next) => {
        let token = req.cookies.token;
        // let login = req.login;
        let secret = process.env.SECRET;

        if(token == 'jwt expired'){
            res.redirect('/');
            next();
        }
        if (loggedIn) {
            if(token == undefined){
                loggedIn = false;
            } else {
                
                // console.log(secret);
                if (token != undefined && token != null && token != '') {
                    decodedToken = jwt.verify(token, secret);
                    // console.log(decodedToken.username + ' this decoded');
                    if (decodedToken.username != undefined && decodedToken.username != null) {
                        loggedIn = true;
                        username = decodedToken.username;
                    }

                }
                // console.log(decodedToken);
                if(decodedToken.username == undefined){
                    loggedIn = false;
                }
            }
        } else {
            if (token != undefined && token != null && token != '') {
                decodedToken = jwt.verify(token, secret);
                    // console.log(decodedToken.username + ' this decoded');
                    if (decodedToken.username != undefined && decodedToken.username != null) {
                        loggedIn = true;
                        username = decodedToken.username;
                    }
            }
        }
        req.login = loggedIn;

        if(loggedIn){
            req.username = username;
        }
        next();
    });
// ================================================================================
//************** Setup & initialize morgan logger **************//
// ================================================================================
    // Set up logger
    app.use(logger('dev'));
    
};


// Seed Database
// models.User.create({
//     username: "Tester McFly",
//     password: "tester@gmail.com",

// })
// .then(function (dbUser) {
//     console.log(dbUser);
// })
// .catch(function (err) {
//     console.log(err.message);
// }); 

/*
<!-- seed
let expToken = jwt.decode(token, secret).exp;

let validJwt = jwt.verify(token, secret, {clockTimestamp: new Date().getTime()}, (result) => {

    return result;
});

console.log(validJwt);

if(expToken > validJwt){
    console.log('expired token');

    res.redirect('/login');
}
<
div class = "container mt-3" >
    <
    div class = "row " >
    <
    div class = "card-deck d-flex justify-content-center" >

    <
    div class = "card mb-4" >
    <
    img class = "card-img-top"
src = "https://blog.cyberpanel.net/wp-content/uploads/2019/03/express-js-cyberpanel.jpeg"
alt = "Card image cap"
width = "400" >
    <
    div class = "card-body" >
    <
    h4 class = "card-title" > ExpressJS < /h4> <
    /div> <
    div class = "card-footer" >
    <
    a href = "/details/{{id}}" > < button type = "button"
class = "btn btn-info" > Details < /button></a >
    <
    small class = "float-right" > Date... < /small> <
    /div> <
    /div>

    <
    div class = "card mb-4" >
    <
    img class = "card-img-top"
src = "https://colorlib.com/wp/wp-content/uploads/sites/2/angular-logo.png"
alt = "Card image cap"
width = "400" >
    <
    div class = "card-body" >
    <
    h4 class = "card-title" > Angular < /h4> <
    /div> <
    div class = "card-footer" >
    <
    a href = "" > < button type = "button"
class = "btn btn-info" > Details < /button></a >
    <
    small class = "float-right" > Date... < /small> <
    /div> <
    /div>

    <
    div class = "card mb-4" >
    <
    img class = "card-img-top"
src = "http://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png"
alt = "Card image cap"
width = "400" >
    <
    div class = "card-body" >
    <
    h4 class = "card-title" > React < /h4> <
    /div> <
    div class = "card-footer" >
    <
    a href = "" > < button type = "button"
class = "btn btn-info" > Details < /button></a >
    <
    small class = "float-right" > Date... < /small> <
    /div> <
    /div> <
    /div> <
    /div> <
    /div> <
    h3 class = "text-center" > No courses... < /h3>
-->
*/