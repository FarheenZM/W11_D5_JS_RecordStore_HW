const _ = require("lodash");

const assert = require("assert");
const Record = require("../models/record");
const Store = require("../models/store");
const RecordCollector = require("../models/recordCollector");

describe("RecordCollector", function(){
  let recordCollector, store, record1, record2;

  beforeEach(function(){
    recordCollector = new RecordCollector();
    recordCollector2 = new RecordCollector();
    store = new Store("The Music Shop", "Mumbai");
    record1 = new Record("Sonu Nigam", "Classically mild", "Classical", 80);
    record2 = new Record("Diljit Dosanjh", "Dil", "Pop", 70);
    record3 = new Record("Sanam Puri", "SANAM", "Pop", 150);
  });

  it('should be able to buy records', function(){
    recordCollector.buyRecord(record1);

    assert.deepStrictEqual(recordCollector.collection.length, 1);
    assert.deepStrictEqual(recordCollector.wallet, 220);
  });

  it('should be able to sell records', function(){
    recordCollector.buyRecord(record1);

    recordCollector.sellRecord(record1);

    assert.deepStrictEqual(recordCollector.collection.length, 0);
    assert.deepStrictEqual(recordCollector.wallet, 300);
  });

  it('should not be able to buy records if cash is less', function(){
    recordCollector.buyRecord(record1);
    recordCollector.buyRecord(record2);
    recordCollector.buyRecord(record2);
    assert.deepStrictEqual(recordCollector.buyRecord(record3), "Sorry! Not enough cash.");
  });

  it('should be able to view the total value of record collection', function(){
    recordCollector.buyRecord(record1);
    recordCollector.buyRecord(record2);

    assert.deepStrictEqual(recordCollector.totalValueOfCollection(), 150);
  });

  it('should be able to view the total value of all records of a given Genre', function(){
    recordCollector.buyRecord(record2);
    recordCollector.buyRecord(record3);

    assert.deepStrictEqual(recordCollector.totalValueByGenre("Pop"), 220);
  });

  it('should be able to view the most valuable record', function(){
    recordCollector.buyRecord(record2);
    recordCollector.buyRecord(record3);

    assert.deepStrictEqual(recordCollector.viewMostValuableRecord(), record3);
  })

  it('should be able to sort records by value', function(){
    recordCollector.buyRecord(record1);
    recordCollector.buyRecord(record2);
    recordCollector.buyRecord(record3);
    assert.deepStrictEqual(recordCollector.sortByValue(), [record2, record1, record3]);
  });

  it('should be able to compare the value of collection with another RecordCollector', function(){
    recordCollector.buyRecord(record1);
    recordCollector.buyRecord(record2);
    recordCollector2.buyRecord(record1);
    assert.deepStrictEqual(recordCollector.compareCollectionValues(recordCollector2), "Collector 1 has more collection worth £150");
  })

});
