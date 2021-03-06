let Course = require('../models/Course');
let Users = require('../models/User');
const jwt = require('jsonwebtoken');
let loggedIn = require('../config/config').loggedIn;


module.exports = {
    route: (req, res) => {
        let id = req.params.id;
        // console.log(id);
        console.log(req.login);

        if (req.cookies.token != undefined && req.cookies.token != null) {
            let token = req.cookies.token;
            let secret = process.env.SECRET;
            decodedToken = jwt.decode(token, secret);
            // console.log(decodedToken);
            username = decodedToken.username;
            req.id = decodedToken._id;
            loggedIn = true;
        } else {
            username = null;
        }
        Course.findById(id).lean().populate('creatorId').populate('usersEnrolled').then((course) => {
            let isOwned = false;
            let isEnrolled = false;
            req.login = true;
            // // console.log(course);
            // // console.log(req.id);
            // // console.log(course)
            // console.log(course);
            
            if(req.id == undefined){
                req.id = req._id;
            }
            // // console.log(req._id);
            let creatorId = course.creatorId[0]._id;
            // // console.log(creatorId);
            if(req.id == creatorId){
                isOwned = true;
                
            } else {
                isOwned = false;
            }
            
            let length = course.usersEnrolled.length;

            for (let i = 0; i < length; i++){
                let enrolled = course.usersEnrolled[i]._id;
                // console.log(enrolled);
                // console.log(req.id);
                if(enrolled == req.id){
                    isEnrolled = true;
                }
            }

            // console.log(isEnrolled);

            // console.log(isOwned);
            res.status(200);
            res.render('details', {
                loggedIn: req.login,
                course: course,
                username:username,
                isOwned:isOwned,
                isEnrolled: isEnrolled,
                layout: 'main'
            });
        }).catch(err => {
            console.log(err);
            return;
        });
    }
};