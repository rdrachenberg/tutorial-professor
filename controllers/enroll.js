// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let Users = require('../models/User');
let Courses = require('../models/Course');
let jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    let id = req.params.id;
    console.log(id);

    Courses.findByIdAndUpdate(id,  {'$push': {'usersEnrolled': req.id}}).populate('usersEnrolled').then(course =>{
        
        console.log(course);
        // let objId = {_id: , isEnrolled: true};
        // course.usersEnrolled = {
            
        // }; 
        
        Users.findByIdAndUpdate(req.id, {'$push': {'isEnrolled': course._id}}).populate('isEnrolled').then(user => {
            // let courseObj = {_id: id, isEnrolled: true};
            // user.isEnrolled.push(courseObj);
            console.log(user);
            isEnrolled = true;
            console.log(course);
            res.redirect('/details/' + id);
        }).catch(err => {
            console.log(err);
        });
    });
};