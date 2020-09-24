module.exports = {
    development: {
        port: process.env.PORT || 8080
    },
    production: {},
    secret: process.env.SECRET,
    loggedIn: false
};