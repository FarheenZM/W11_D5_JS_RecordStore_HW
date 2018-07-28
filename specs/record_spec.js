const _ = require("lodash");

const assert = require("assert");
const Record = require("../models/record");

describe("Record", function(){
  let record;

  beforeEach(function(){
    record = new Record("Sonu Nigam", "Classically Mild", "Classical", 80);
  });

  it('should have an artist', function(){
    assert.deepStrictEqual(record.artist, "Sonu Nigam");
  });

  it('should have a title', function(){
    assert.deepStrictEqual(record.title, "Classically Mild");
  });

  it('should have a genre', function(){
    assert.deepStrictEqual(record.genre, "Classical");
  });

  it('should have a price', function(){
    assert.deepStrictEqual(record.price, 80);
  });

  it('should print the properties of a record as a string', function(){
    assert.deepStrictEqual(record.printDetails(record), "Sonu Nigam, Classically Mild, Classical, 80");
  });

});
