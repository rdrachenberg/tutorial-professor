// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let User = require('../models/User');
let Courses = require('../models/Course');
let jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    res.status(200);
    let id = req.params.id;
    Courses.findByIdAndDelete(id).then(course => {
        console.log(course);
        User.updateMany({
            'isEnrolled': course._id,
            
        },
        {
            '$pull': {'isEnrolled':course._id},
            
        }).then(course => {
            console.log(course);
            res.redirect('/');
        });
        //* STOPPED HERE **********************************
    });
};