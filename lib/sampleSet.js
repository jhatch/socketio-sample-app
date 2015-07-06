// details specific to this data set,
// - like how you get retrieve it,
// - what params it takes,
// - and how often it refreshes

var DataSet   = require('./dataSet');
var sampleSet = new DataSet();

sampleSet.fetch = function () {
  console.log('fetching', process.pid);

  this.IN_PROGRESS = true;

  // go do async stuff to get the data...
  var self = this;
  setTimeout(function () {
    self.emit(+new Date());
    self.IN_PROGRESS = false;
  }, 100);
};

module.exports = sampleSet;