// base DataSet class
// lowest level details dealing with socokets, rooms, namespaces
var redis  = require("redis");
var client = redis.createClient({
  detect_buffers: true
});

function DataSet() {

}

DataSet.prototype.checkPending = function (cb) {
  console.log('isPending', this.room);

  if (!this.room) {
    return false;
  }

  client.get(this.room, function (err, reply) {
    if (err) {
      console.error(err);
    }
    cb(!!reply);
  });
};

DataSet.prototype.setPending = function (p) {
  console.log('setPending', this.room, p);
  client.set(this.room, p);
};

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
