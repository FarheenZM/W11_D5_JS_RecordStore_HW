const _ = require("lodash");

const RecordCollector = function(){
  this.wallet = 300;
  this.collection = [];
};

RecordCollector.prototype.buyRecord = function(record){
  if(this.wallet >= record.price){
    this.wallet -= record.price;
    this.collection.push(record);
  }else{
    return "Sorry! Not enough cash.";
  }
};

RecordCollector.prototype.sellRecord = function(record){
  this.collection.pop(record);
  this.wallet += record.price;
}

RecordCollector.prototype.totalValueOfCollection = function(){
  return _.sumBy(this.collection, "price");
};

RecordCollector.prototype.totalValueByGenre = function(genre){
  return _.chain(this.collection).filter(record => record.genre === genre).sumBy("price").value();
};

RecordCollector.prototype.viewMostValuableRecord = function(){
  return _.maxBy(this.collection, "price");
};

RecordCollector.prototype.sortByValue = function(){
  return _.orderBy(this.collection, "price", "asc")
};

RecordCollector.prototype.compareCollectionValues = function(collector){
  if(this.totalValueOfCollection() > collector.totalValueOfCollection()){
    return "Collector 1 has more collection worth £" + this.totalValueOfCollection();
  }else if (this.totalValueOfCollection() < collector.totalValueOfCollection()) {
    return "Collector 2 has more collection worth £" + collector.totalValueOfCollection();
  }else {
    return "Both collectors have equal worth of collection!";
  }
};

module.exports = RecordCollector;
