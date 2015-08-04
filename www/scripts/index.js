//This bootstrapping is in place because webpack doesn't like .jsx as entry points
//(or at least I can't make it work)
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('./app').go();