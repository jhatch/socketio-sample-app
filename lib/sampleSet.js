// details specific to this data set,
// - like how you get retrieve it,
// - what params it takes,
// - and how often it refreshes

var DataSet   = require('./dataSet');
var sampleSet = new DataSet();

sampleSet.fetch = function () {
  var self = this;

  this.checkPending(function (isPending) {
    if (isPending) {
      return;
    }

    console.log('fetching', process.pid);

    self.setPending(true);

    // go do async stuff to get the data...
    setTimeout(function () {
      self.emit(+new Date());
      self.setPending(false);
    }, 12 * 1000);
  });
};

module.exports = sampleSet;