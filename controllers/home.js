// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let user = require('../models/User');
let courses = require('../models/Course')
// let username = this.user; // <<<<<<< not working
// let loggedIn = true;
module.exports = (req, res) => {
    res.status(200);

    courses.find({}).then(courses => {
        console.log(courses);
        res.render('index', {
            courses: courses[0],
            username: user.token,
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