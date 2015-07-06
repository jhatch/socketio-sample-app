var express = require('express');
var app     = express();

// basic static assets
app.use('/assets', express.static(__dirname + '/public'));
app.use('/index.html', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// mount the socket.io channels
require('./lib/ioRoutes')(app)
 .listen(process.env.NODE_PORT || 3000);

