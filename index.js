const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

require('dotenv').config();

app.listen(config.port, console.log(`🌎==> Server now listening on port ${config.port} <==🌎`));