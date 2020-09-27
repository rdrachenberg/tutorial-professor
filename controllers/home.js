// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let user = require('../models/User');
let courses = require('../models/Course');
let jwt = require('jsonwebtoken');

// let username = this.user; // <<<<<<< not working
// let loggedIn = true;
module.exports = (req, res) => {
    res.status(200);

    courses.find({}).lean().then(course => {
        // console.log(course);
        // console.log(req.login);
        // console.log(req.cookies.token);

        if (req.cookies.token != undefined && req.cookies.token != null) {
            let token = req.cookies.token;
            let secret = process.env.SECRET;
            decodedToken = jwt.verify(token, secret);
            // console.log(decodedToken.username);
            username = decodedToken.username;
        } else {
            username = null;
        }
        

        res.render('index', {
            courses: course,
            loggedIn: req.login,
            username: username,
            layout: 'main'
        });
    });
    // res.render('index', {
    //     // loggedIn: loggedIn,
    //     courses: courses,
    //     username: user.token,
    //     layout: 'main'
    // });
    // console.log( username + ' <<<<<<<< username');
};