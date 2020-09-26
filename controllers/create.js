// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let user = require('../models/User');
let Course = require('../models/Course');

module.exports = {
    route: (req, res) => {
        res.status(200);
        res.render('create', {
        // loggedIn: loggedIn,
        // username: user.token,
        layout: 'main'
        });
    },

    data: (req, res) => {
        let newCourse = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isPublic: req.body.isPublic,

        };

        if(newCourse.isPublic === undefined){}
        newCourse.isPublic = true;

        new Course(newCourse).save()
        .then((course) => {
            console.log(course);
            // res.redirect('/');
        }).catch(err => {
            if(err){
                console.log(err._message);
                return;
            }
        });

        Course.find({}).then(courses => {
            console.log(courses);
            res.redirect('/')
        });
        
        // console.log(res);
        // console.log(description);
        // console.log(imageUrl);
        // console.log(isPublic);
        // console.log(newCourse);

    }
    
};