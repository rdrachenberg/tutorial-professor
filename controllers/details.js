let Course = require('../models/Course');
const jwt = require('jsonwebtoken');

module.exports = {
    route: (req, res) => {
        let id = req.params.id;

        if (req.cookies.token != undefined && req.cookies.token != null) {
            let token = req.cookies.token;
            let secret = process.env.SECRET;
            decodedToken = jwt.decode(req.cookies.token, process.env.SECRET);
            console.log(decodedToken);
            username = decodedToken.username;
            req.id = decodedToken._id;
        } else {
            username = null;
        }
        Course.findById(id).lean().populate('creatorId').populate('usersEnrolled').then((course) => {
            let isOwned = false;
            let isEnrolled = false;
            console.log(course);

            console.log(req.id);
            // console.log(course)
            


            if(req.id == undefined){
                req.id = req._id;
            }
            console.log(req._id);

            let creatorId = course.creatorId[0]._id;
            console.log(creatorId);

            if(req.id == creatorId){
                isOwned = true;
                
            } else {
                isOwned = false;
            }

            if(req.id == course.usersEnrolled[0]._id){
                isEnrolled = true;
            } else {
                isEnrolled = false;
            }
            
            console.log(isOwned);
            res.status(200);
            res.render('details', {
                loggedIn: req.login,
                course: course,
                username:username,
                isOwned:isOwned,
                isEnrolled: isEnrolled,
                layout: 'main'
            });
        });

    }
};