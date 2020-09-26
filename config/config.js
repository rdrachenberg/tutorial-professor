module.exports = {
    development: {
        port: process.env.PORT || 3030,
        loggedIn: true
    },
    production: {},
    secret: process.env.SECRET,
    loggedIn: true
};