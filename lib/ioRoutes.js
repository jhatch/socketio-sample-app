var sampleSet = require('./sampleSet');

module.exports = function (app) {

  var http = require('http').Server(app);
  var io   = require('socket.io')(http).of('/data-set');

  io.on('connection', function (socket) {
    console.log('new connection', socket.id);

    // handle listening to a data-set
    socket.on('listen', function (data) {
      console.log('listening to ', data.name);

      // pay attention to this data set
      // TODO: use a hash of params + name
      socket.join(data.name);

      // make sure its already in progress
      if (!sampleSet.IN_PROGRESS) {
        sampleSet.fetch(io, data.name);
      }

    });
  });

  return http;
};