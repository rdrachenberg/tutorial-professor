// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let User = require('../models/User');
let config = require('../config/config');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
// let username = this.user;
module.exports = {
    route: (req, res) => {
        res.status(200);
        res.render('login', {
            loggedIn: req.loggedIn,
            layout: 'main'
        });
        // console.log(username + ' <<<<<<<< username');
    },

    data: (req, res) => {
        res.status(201);
        let username = req.body.username;
        let password = req.body.username;

        User.findOne({username:username}).then((user) => {
            if(!user){
                res.status(400);
                console.log('username is incorect'); 
            } else {
                // console.log(user + " This is the user from login\n");
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err){
                        res.status(500);
                        return;
                    }
                    // console.log(result);
                    if(result){
                        config.loggedIn = true;
                        const token = jwt.sign({username:user.username, _id: user._id}, process.env.SECRET, {expiresIn:'1h'});
                        
                        res.cookie('token', token);
                        res.redirect('/');
                    }
                });
            }
        });
    }
};