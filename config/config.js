require('dotenv').config();
const port = process.env.PORT;

module.exports = {
    development: {
        port: process.env.PORT || 3030,
        loggedIn: true
    },
    production: {
    port: port, 
    secret: process.env.SECRET,
    loggedIn: false
    },
    
};