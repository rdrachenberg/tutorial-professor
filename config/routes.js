// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let path = require('path');
let controllers = require('../controllers/index');
let homeController = require('../controllers/home.js');

let userControllerRoute = require('../controllers/user.js').route;
let userControllerData = require('../controllers/user.js').data;

let loginControllerRoute = require('../controllers/login.js').route;
let loginControllerData = require('../controllers/login.js').data;

let createControllerRoute = require('../controllers/create.js').route;
let createControllerData = require('../controllers/create.js').data;

let detailsControllerRoute = require('../controllers/details.js').route;
let detailsControllerData = require('../controllers/details.js').data;

// ==============================================================================
//* ALL ROUTING & EXPORT MODULE *
// ==============================================================================
module.exports = (app) => {
// ==============================================================================
//************ Home Route ************\\
// ==============================================================================
    app.get('/', (req, res) => {
        homeController(req, res);
    });
// ==============================================================================
//************ Register Route ************\\
// ==============================================================================
    app.get('/register', (req, res) => {
        userControllerRoute(req, res);
    });
    app.post('/register', (req, res) => {
        userControllerData(req, res);
    });
// ==============================================================================
//************ Login Routes ************\\
// ==============================================================================
    app.get('/login', (req, res) => {
        loginControllerRoute(req, res);
    });
    app.post('/login', (req, res) => {
        loginControllerData(req, res);
    });
// ==============================================================================
//************ Create Course Routes ************\\
// ==============================================================================
    app.get('/course/create', (req, res) => {
        createControllerRoute(req, res);
    });
    app.post('/course/create', (req, res) => {
        createControllerData(req, res);
    });

// ==============================================================================
//************ Create Course Routes ************\\
// ==============================================================================
    app.get('/details/:id', (req, res) => {
        detailsControllerRoute(req, res);
    });
    app.post('/details/:id', (req, res) => {
        detailsControllerData(req, res);
    });



// ==============================================================================
//************ Not Found Route ************\\
// ==============================================================================
// If no matching route is found default to 404 page
    app.get("*", function (req, res) {
        res.status(404);
        res.render(path.join(__dirname, "../views/404.hbs"));
    });
};