module.exports = {
    route: (req, res) => {
        res.status(200);
        res.render('details', {
            loggedIn: req.login,
            layout: 'main'
        });
    }
};