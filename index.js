var express = require('express');
var redis   = require("redis");
var app     = express();
var client  = redis.createClient({
  detect_buffers: true
});

// basic static assets
app.use('/assets', express.static(__dirname + '/public'));
app.use('/index.html', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// clear redis state
app.get('/redis/clear', function (req, res) {
  client.del('sample', function (err) {
    err? res.send(500, err) : res.send(200);
  });
});

// mount the socket.io channels
require('./lib/ioRoutes')(app)
 .listen(process.env.NODE_PORT || 3000);

