// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let Users = require('../models/User');
let Courses = require('../models/Course');
let jwt = require('jsonwebtoken');
let { loggedIn } = require('../config/config').loggedIn;

module.exports = (req, res) => {
    let id = req.params.id;
    console.log(id);
    loggedIn = true;
    // Courses.find(id).populate('usersEnrolled').then(course => {
        // console.log(course.usersEnrolled);
    // });
    
    Courses.findByIdAndUpdate(id,  {'$push': {'usersEnrolled': req.id}}).populate('usersEnrolled').exec().then(course =>{
        
        console.log(course);
        // let objId = {_id: , isEnrolled: true};
        // course.usersEnrolled = {
            
        // }; 
        
        Users.findByIdAndUpdate(req.id, {'$push': {'isEnrolled': course._id}}).populate('isEnrolled').exec().then(user => {
            // let courseObj = {_id: id, isEnrolled: true};
            // user.isEnrolled.push(courseObj);
            console.log(user);
            isEnrolled = true;
            // console.log(course);
            setTimeout(() => {
                res.redirect('/details/' + id);
            }, 200);
            
        }).save().catch(err => {
            console.log(err);
        });
    });
};