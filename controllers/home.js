// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let user = require('../models/User');
let courses = require('../models/Course');
let jwt = require('jsonwebtoken');

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
            // console.log(decodedToken);
            username = decodedToken.username;
            req.id = decodedToken._id;
            // console.log(req.id);
        } else {
            username = null;
        }

        res.render('index', {
            courses: course,
            loggedIn: req.login,
            username: username,
            _id: req.id,
            layout: 'main'
        });
    });
};