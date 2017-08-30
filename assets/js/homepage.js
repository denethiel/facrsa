require('../styles/bootstrap.min.css');
require('../styles/material-design-iconic-font.min.css');
require('../styles/importer.less');

// Require the sockets.js file if you want to be able to use the socket client to
// do things like `io.socket.get()` inside of this script.
var io = require('./dependencies/sails.io.js');
io.sails.url = 'http://localhost:1337';

// To make the socket client available globally, uncomment the next line:
window.io = io;


