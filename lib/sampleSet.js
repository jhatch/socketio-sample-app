// singleton

var DataSet   = require('./dataSet');
var sampleSet = new DataSet();

sampleSet.fetch = function (io, room) {
  this.IN_PROGRESS = true;

  // go do async stuff to get the data...
  var self = this;

  process.nextTick(function () {
    io.to(room).emit('data', 'sample data!!!');
    self.IN_PROGRESS = false;
  });
};

module.exports = sampleSet;