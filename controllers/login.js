// ==============================================================================
//* DEPENDENCIES *
// ==============================================================================
let user = require('../models/User');
let username = this.user;
module.exports = {
    route: (req, res) => {
        res.status(200);
        res.render('login', {
            loggedIn: req.loggedIn,
            layout: 'main'
        });
        console.log(username + ' <<<<<<<< username');
    }
};