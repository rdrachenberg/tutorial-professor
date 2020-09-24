// require models if need be 
let user = require('../models/User');

console.log(user);

module.exports = (req, res) => {
    res.status(200);
    res.render('index', {
        layout: 'main'
    });
};