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

let editControllerRoute = require('../controllers/edit.js').route;
let editControllerData = require('../controllers/edit.js').data;

let deleteControllerData = require('../controllers/delete.js');
let enrollControllerData = require('../controllers/enroll');

let loggedIn = require('./config').loggedIn;
let secret = require('./config').secret;



const { check, validationResult } = require('express-validator');
const { config } = require('./config');
const { decode } = require('punycode');
const jwt = require('jsonwebtoken');
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
            min: 5
        })
        .withMessage('UserName must be filled in'),
        check('password')
            .trim()
            .isString()
            .isLength({
                min: 5
            })
            .withMessage('password must be filled in'),
        check('repeatPassword')
            .trim()
            .isString()
            .isLength({
                min: 5
            })
            .withMessage('repeat password must be filled in'),
    ], (req, res) => {
        const errors = validationResult(req);
        let {password, repeatPassword} = req.body;
        if (!errors.isEmpty()) {
            res.status(422);

            userControllerRoute(req, res, {
                message: 'validation err, the entered info is incorrect',
                errors: errs.array()
            });
        } else if (password != repeatPassword) {
            res.status(422);
            userControllerRoute(req, res, {
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
    app.post('/course/create', [
        check('title')
        .trim()
        .isString()
        .isLength({
            min: 4
        })
        .withMessage('Title must be filled in'),
        check('description')
        .trim()
        .isString()
        .isLength({
            min: 20,
            max: 50,
        })
        .withMessage('description must be filled in'),
        check('imageUrl')
        .trim()
        .isString()
        .isLength({
            min: 7,
        })
        .isURL()
        .withMessage('imageUrl must be valid must be filled in'),
        check("imageUrl").notEmpty().custom(value => {
            if (/^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/.test(value)) {
                throw new Error('Please make sure you add in an image (ends in .png, .jpg, .jpeg, .gif).');
            }
            // Indicates the success of this synchronous custom validator
            return true;
        }),
    ], (req, res) => {

        createControllerData(req, res);
    });

// ==============================================================================
//************ Details Course Routes ************\\
// ==============================================================================
    app.get('/details/:id', (req, res) => {
        let secret = process.env.SECRET;
        if(loggedIn){
            decodedToken = jwt.verify(req.cookies.token, secret);
            // console.log(decodedToken._id);
            req.id = decodedToken._id;
            if (decodedToken.id == null || decodedToken.id == undefined){
                req.id = decodedToken._id;
            } else {
                req.id = decodedToken.id;
            }
        }
        detailsControllerRoute(req, res);
    });
// ==============================================================================
//************ Edit Course Routes ************\\
// ==============================================================================
    app.get('/edit/:id', (req, res) => {
        let secret = process.env.SECRET;
        if(loggedIn){
            decodedToken = jwt.verify(req.cookies.token, secret);
            // console.log(decodedToken._id);
            req.id = decodedToken._id;
            if (decodedToken.id == null || decodedToken.id == undefined){
                req.id = decodedToken._id;
            } else {
                req.id = decodedToken.id;
            }
        }
        editControllerRoute(req, res);
    });

    app.post('/edit/:id', (req, res) => {
        if(loggedIn){
            let secret = process.env.SECRET;
            decodedToken = jwt.decode(req.cookies.token, secret);
            req.id = decodedToken._id;
            editControllerData(req, res);
        }
    });
    
// ==============================================================================
//************ Delete Route ************\\
// ==============================================================================
    app.get('/delete/:id', (req, res) => {
        if(loggedIn){
            let secret = process.env.SECRET;
            decodedToken = jwt.decode(req.cookies.token, secret);
            req.id = decodedToken._id;
            deleteControllerData(req, res);
        }
        
    });
// ==============================================================================
//************ Enroll Route ************\\
// ==============================================================================
    app.get('/enroll/:id', (req, res) => {
        loggedIn = req.login;
        
        if (loggedIn) { 
            let secret = process.env.SECRET;
            decodedToken = jwt.decode(req.cookies.token, secret);
            req.id = decodedToken._id;
            enrollControllerData(req, res);
        }
        
    });
// ==============================================================================
//************ Logout Route ************\\
// ==============================================================================
    app.get('/logout', (req, res) => {
        
        loggedIn = false;
        res.clearCookie('token');
        setTimeout(() => {
            res.redirect('/');
        }, 1300);
        
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