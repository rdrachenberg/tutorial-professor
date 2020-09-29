// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let User = require('../models/User');
let Course = require('../models/Course');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

module.exports = {
    
    route: (req, res) => {
        let editId = req.params.id;
        
        let decodedToken = jwt.decode(req.cookies.token, process.env.SECRET);
        console.log(decodedToken);
        username = decodedToken.username;
        // req.id
        Course.find({_id: editId}).lean().then((course) => {
            course = course[0];
            console.log(course);

            res.status(200);
            res.render('edit', {
                title: 'Edit course',
                loggedIn: req.login,
                username:username,
                course: course,
                layout: 'main',
            });
        });
    },
    data: (req, res) => {
        console.log(req.id);
        let editId = req.params.id;


        Course.findById(editId).then((course) => {
            let title = req.body.title;
            let description = req.body.description;
            let imageUrl = req.body.imageUrl;

            if (course.length == 0) {
                res.status(400);
                console.log(course);
                console.log('Record not found. Please try again');
                res.redirect('/');
                return;
            } if(course.creatorId[0] != req.id){
                console.log(req.id);
                console.log('creatorId does not match');
                res.redirect('/');
            } else {
                course.title = title;
                course.description = description;
                course.imageUrl = imageUrl;

                course.save().then((courseUpdated) => {
                    console.log(courseUpdated);
                    res.redirect('/details/' +courseUpdated._id);
                })
                
                .catch(err => {
                    res.status(400);
                    console.log(err);
                });
            }
        });
    }
};
