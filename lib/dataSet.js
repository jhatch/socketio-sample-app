// base DataSet class
// lowest level details dealing with socokets, rooms, namespaces

function DataSet() {

}

DataSet.prototype.IN_PROGRESS = false;

DataSet.prototype.fetch = function () {
  throw new Error('for now, must override DataSet#fetch in the child class');
};

DataSet.prototype.use = function (io, room) {
  this.io   = io;
  this.room = room;
};

DataSet.prototype.emit = function (data) {
  this.io.to(this.room).emit('data', data);
}

DataSet.prototype.poll = function () { // mimc BI layer pushing us data, poll for now
  this.tid = setInterval(this.fetch.bind(this), 10 * 1000);
};

DataSet.prototype.stop = function () {
  clearInterval(this.tid);
};

module.exports = DataSet;
