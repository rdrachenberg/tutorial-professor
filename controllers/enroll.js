// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let Users = require('../models/User');
let Courses = require('../models/Course');
let jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    let id = req.params.id;

    Courses.findById(id).populate('usersEnrolled').then(course =>{
        
        console.log(course);
        // let objId = {_id: , isEnrolled: true};
        course.usersEnrolled.push(req.id);

        Users.findById(req.id).populate('isEnrolled').then(user => {
            let courseObj = {_id: id, isEnrolled: true};
            user.isEnrolled.push(courseObj);
            console.log(user);
            isEnrolled = true;
            console.log(course);
            res.redirect('/details/' + id);
        }).catch(err => {
            console.log(err);
        });
    });
};