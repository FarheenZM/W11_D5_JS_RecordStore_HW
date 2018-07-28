const _ = require("lodash");

const assert = require("assert");
const Record = require("../models/record");
const Store = require("../models/store");

describe("Store", function(){
  let store, record1, record2;

  beforeEach(function(){
    store = new Store("The Music Shop", "Mumbai");
    record1 = new Record("Sonu Nigam", "Classically mild", "Classical", 80);
    record2 = new Record("Diljit Dosanjh", "Dil", "Pop", 70);
    record3 = new Record("Sanam Puri", "SANAM", "Pop", 50);
  });

  it('should have a name', function(){
    assert.deepStrictEqual(store.name, "The Music Shop");
  });

  it('should have a city', function(){
    assert.deepStrictEqual(store.city, "Mumbai");
  });

  it('should be able to add records to the inventory', function(){

    assert.deepStrictEqual(store.inventory.length, 0)

    store.addRecordsToInventory(record1);
    assert.deepStrictEqual(store.inventory.length, 1);
  });

  it('should display the list of inventory', function(){
    store.addRecordsToInventory(record1);
    store.addRecordsToInventory(record2);

    actual = store.displayListOfInventory();
    expected = [record1.printDetails(), record2.printDetails()];
    assert.deepStrictEqual(actual, expected);

  });

  it('should be able to sell the records and change balance', function(){
    store.addRecordsToInventory(record1);
    store.sellRecord(record1);
    assert.deepStrictEqual(store.balance, 5080);
  });

  it('should be able to display the balance & value of inventory', function(){
    store.addRecordsToInventory(record1);
    store.addRecordsToInventory(record2);

    store.sellRecord(record1);
    store.sellRecord(record2);

    store.financialReport();

    assert.deepStrictEqual(store.balance, 5150);
    assert.deepStrictEqual(store.inventory.length, 0);
  });

  it('should be able to view all records of a given genre', function(){
    store.addRecordsToInventory(record1);
    store.addRecordsToInventory(record2);
    store.addRecordsToInventory(record3);

    assert.deepStrictEqual(store.viewRecordsByGenre("Pop"), [record2, record3]);
  });

});
