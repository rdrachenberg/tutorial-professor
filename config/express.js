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

module.exports = (app) => {
// ================================================================================    
//************** Mongoose Connect Setup **************//
// ================================================================================
    mongoose.connect("mongodb://localhost:27017/students", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 2500,
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
};