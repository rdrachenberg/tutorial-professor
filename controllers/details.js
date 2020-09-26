module.exports = {
    route: (req, res) => {
        res.status(200);
        res.render('details', {

            layout: 'main'
        });
    }
};