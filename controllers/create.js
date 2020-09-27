// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let User = require('../models/User');
let Course = require('../models/Course');
let jwt = require('jsonwebtoken');
// let secret = require('../config/config').secret; // not working?!

module.exports = {
    route: (req, res) => {
        if (req.cookies.token != undefined && req.cookies.token != null) {
            let token = req.cookies.token;
            let secret = process.env.SECRET;
            decodedToken = jwt.verify(token, secret);
            // console.log(decodedToken.username);
            username = decodedToken.username;
        } else {
            username = null;
        }
        res.status(200);
        res.render('create', {
        loggedIn: req.login,
        username: username,
        layout: 'main'
        });
    },

    data: (req, res) => {
        
        let secret = process.env.SECRET;
        let decodedToken = jwt.verify(req.cookies.token, secret);
        console.log(decodedToken);
        User.findById(decodedToken.id).then((user) => {
            let newCourse = {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: req.body.isPublic,
                creatorId: user,

            };

            if (newCourse.isPublic === undefined) {}
            newCourse.isPublic = true;

            new Course(newCourse).save()
            .then((course) => {
                console.log(course);
                // res.redirect('/');
            }).catch(err => {
                if(err){
                    res.status(400);
                    console.log(err._message);
                    return;
                }
            });

        });

        Course.find({}).then(courses => {
            // console.log(courses);
            res.redirect('/');
        });
        
        // console.log(res);
        // console.log(description);
        // console.log(imageUrl);
        // console.log(isPublic);
        // console.log(newCourse);

    }
    
};