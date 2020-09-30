// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let User = require('../models/User');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let $ = require('jquery');
let notify = require('../lib/notify.min.js');

module.exports = {

    route: (req, res) => {
        res.status(200);
        res.render('register', {
            title: 'Register User',
            loggedIn: req.login,
            layout: 'main',
        });
    },
    data: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        User.find({username:username}).then((userFound) =>{
            if(userFound.length > 0){
                res.status(400);
                console.log(userFound);
                console.log('User already registered, please login');
                res.redirect('/login');
                return;
            }
        });

        new User({
            username: username,
            password: password, 
        }).save()
            .then(function (newUser) {
                // console.log(newUser);
                User.find({username:newUser.username}).then((newUser) => {
                    // console.log(newUser);
                    if(newUser.length == 0){
                        console.log('signup error');
                        res.status(500);
                        res.redirect('/register');
                    } else {
                        let passTwo = newUser[0].password;
                        bcrypt.compare(password, passTwo, function (err, result) {
                            if (result) {
                                this.loggedIn = true;
                                // console.log(result + ' result = hash compare');
                                // console.log(newUser[0].username);
                                let newUserName = newUser[0].username;
                                let newUserId = newUser[0]._id;

                                const token = jwt.sign({username: newUserName, _id: newUserId}, 
                                    process.env.SECRET, {
                                    expiresIn: '1h'
                                });
                                // console.log(token + ' <<<< is token!');
                                res.cookie('token', token);
                                // Need to add success message to front end UX
                                setTimeout(() => {
                                    res.redirect('/');
                                }, 1500);
                                    
                                
                                
                                
                                

                            } else {
                                res.json({
                                    status: 'error',
                                    message: 'Invalid username or password',
                                    data: null
                                });
                                console.log(result + ' <<<< is error result?');
                            }
                            // res.redirect('/');
                        });
                    }
                    
                });
            })
                .catch(err => {
                res.status(400);
                console.log(err);
            });
    }
};

 // loggedIn = true;
 // console.log(loggedIn + ' <<<< is loggedIn?');
 // console.log(secret);
 // res.json({
 //     status: 'success',
 //     message: 'user found!',
 //     data: {
 //         user: newUser,
 //         token: token,
 //         // loggedIn: true,
 //         username: newUser.username
 //     }

 // });

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