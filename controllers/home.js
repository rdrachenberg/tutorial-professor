// require models if need be 

module.exports = (req, res) => {
    res.status(200);
    res.render('index', {
        layout: 'main'
    });
};