'use strict'
const expect = require("chai").expect;
const book = require("../data");
// getItem test
describe("Book module", () => {
    it("get test: returns requested book", () => {
      const result = book.getItem("Gaiman");
      expect(result).to.deep.equal({ "firstName": "Neil", "lastName": "Gaiman", "favOne": "American Gods", "favTwo": "Coraline" });
    });
    
    it("get test: fails w/ invalid book", () => {
      const result = book.getItem("fake");
      expect(result).to.be.undefined;
    });
   });
// addItem test
  
    it("add test: returns requested book", () => { 
      const result = book.addItem({firstName: 'Frank', lastName: 'Herbert', favOne: 'Dune', favTwo: 'Dune Messiah'});
      expect(result).to.deep.equal({
        firstName: 'Frank', 
        lastName: 'Herbert', 
        favOne: 'Dune', 
        favTwo: 'Dune Messiah'
    });
  });
    it("add test: fails w/ invalid book", () => {
      const result = book.addItem("fake"); 
      expect(result).to.be.undefined;
    });
  

    //delete item test
    it("delete test: returns requested book", () => { 
      const result = book.deleteItem({
        firstName: 'Frank', 
        lastName: 'Herbert', 
        favOne: 'Dune', 
        favTwo: 'Dune Messiah'
    });
      expect(result).to.be.true; 
    });
    it("delete test: fails w/ invalid book", () => {
      const result = book.deleteItem("fake"); 
      expect(result).to.be.false;
    });



 