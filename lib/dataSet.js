// base DataSet class

function DataSet() {

}

DataSet.prototype.IN_PROGRESS = false;

DataSet.prototype.fetch = function () {
  throw new Error('for now, must override DataSet#fetch in the child class');
};

module.exports = DataSet;
