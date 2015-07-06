// Application level logic
module.exports = function (app) {

  var redis     = require('socket.io-redis');
  var http      = require('http').Server(app);
  var io        = require('socket.io')(http);
  var sampleSet = require('./sampleSet');

  // allow for multi-process room sharing
  io.adapter(redis({
    host: 'localhost',
    port: 6379
  }));

  var ioDataSet = io.of('/data-set');

  ioDataSet.on('connection', function (socket) {
    console.log('new connection', socket.id);

    // handle listening to a data-set
    socket.on('listen', function (data) {
      console.log('listening to', data.name);

      // pay attention to this data set
      // TODO: use a hash of params + name
      socket.join(data.name);

      // kick off the sample set
      sampleSet.use(ioDataSet, data.name);
      sampleSet.fetch();
      sampleSet.poll();
    });

    socket.on('disconnect', function () {
      sampleSet.stop();
    });
  });

  return http;
};