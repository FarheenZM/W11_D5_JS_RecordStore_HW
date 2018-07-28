const _ = require("lodash");

const Store = function(name, city){
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = 5000;

};

Store.prototype.addRecordsToInventory = function(record){
  this.inventory.push(record);
};

Store.prototype.displayListOfInventory = function(){
  var inventory = this.inventory.map(function(record){
    return record.printDetails();
  })
  return inventory;
};

Store.prototype.sellRecord = function(record){
  // this.inventory.find(function(record){
    this.inventory.pop(record);
    this.balance += record.price;
  // });
};

Store.prototype.financialReport = function(){
  return this.balance;
  return this.inventory;
};

Store.prototype.viewRecordsByGenre = function(genre){
  return _.filter(this.inventory, item => item.genre == genre);
};


module.exports = Store;
