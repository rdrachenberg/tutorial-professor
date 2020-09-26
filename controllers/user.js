// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let User = require('../models/User');

let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let cookieparser = require('cookie-parser');

module.exports = {

    route: (req, res) => {
        res.status(200);
        res.render('register', {
            title: 'Register User',
            // user: user,
            layout: 'main',
        });
    },
    data: (req, res) => {
        let user = req.body;

        new User(user).save()
            .then(function (newUser) {
                console.log(newUser);
                bcrypt.compare(req.body.password, newUser.password, function (err, result) {
                    
                    if (result) {
                        console.log(result);
                        // loggedIn = true;
                        // console.log(loggedIn + ' <<<< is loggedIn?');
                        // console.log(secret);
                        const token = jwt.sign({id: newUser._id}, process.env.SECRET, {expiresIn: '1h'});
                        
                        res.json({
                            status: 'success',
                            message: 'user found!',
                            data: {
                                user: newUser,
                                token: token,
                                // loggedIn: true,
                                username: newUser.username
                            }
                            
                        });
                        
                        console.log(token + ' <<<< is token!');
                        // res.render('index', {
                        //     // username: username,
                        //     token: token,
                        //     layout: 'main'
                        // });
                        // console.log(loggedIn + ' <<<< is loggedIn?');
                        
                        // console.log(username + ' <<<< is the username!');
                        // res.redirect('/');
                        // return res.cookie('token', token, {
                        //     expires: new Date(Date.now() + 604800000),
                        //     secure: false,
                        //     httpOnly: true
                        // });
                        // .then((cookie) => {
                        //     console.log(cookie);
                        //     res.render('main')
                        // });
                        
                    } else {
                        res.json({status: 'error', message:'Invalid email', data: null});
                        console.log(result + ' <<<< is error result?');
                    }
                    // res.redirect('/');
                });
            }).catch(err => {
                console.log(err);
            });

        

    }

};