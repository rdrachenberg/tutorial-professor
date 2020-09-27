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

let loggedIn = require('./config').loggedIn;
let secret = require('./config').secret;

const { check, validationResult } = require('express-validator');
const { config } = require('./config');
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
    app.post('/register', [
        check('username')
        .trim()
        .isString()
        .isLength({
            min: 1
        })
        .withMessage('UserName must be filled in'),
        check('password')
            .trim()
            .isString()
            .isLength({
                min: 1
            })
            .withMessage('password must be filled in'),
        check('repeatPassword')
            .trim()
            .isString()
            .isLength({
                min: 1
            })
            .withMessage('repeat password must be filled in'),
    ], (req, res) => {
        const errors = validationResult(req);
        let {password, repeatPassword} = req.body;
        if (!errors.isEmpty()) {
            res.status(422);

            registerRoute(req, res, {
                message: 'validation err, the entered info is incorrect',
                errors: errs.array()
            });
        } else if (password != repeatPassword) {
            res.status(422);
            registerRoute(req, res, {
                message: 'validation error, entered info is incorrect',
                errors: [{
                    value: [password, repeatPassword],
                    msg: 'password and reapeatePassword must be the same',
                    params: ['password', 'repeatPassword'],
                    location: 'body'
                }]
            });
        } else {
            userControllerData(req, res);
        }
    });
// ==============================================================================
//************ Login Routes ************\\
// ==============================================================================
    app.get('/login', (req, res) => {
        loginControllerRoute(req, res);
    });
    app.post('/login', [
        check('username')
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('UserName must be filled in'),
        check('password')
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('password must be filled in'),
    ], (req, res) => {
        const errors = validationResult(req);
        // let {username, password} = req.body;
        if(!errors.isEmpty()) {
            res.status(422);

            loginControllerRoute(req, res, {
                message: 'validation err, the entered info is incorrect',
                errors: errs.array()
            });
        } else {
            loginControllerData(req, res);
        }
        
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
//************ Logout Route ************\\
// ==============================================================================
    app.get('/logout', (req, res) => {
        loggedIn = false;
        res.clearCookie('token');
        res.redirect('/');
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