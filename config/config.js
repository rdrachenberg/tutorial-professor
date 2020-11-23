const dotenv = require('dotenv');
module.exports = {
    development: {
        port: process.env.PORT || 3030,
        loggedIn: true
    },
    production: {},
    secret: process.env.SECRET,
    loggedIn: false
};