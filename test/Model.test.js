const { expect } = require('chai');
const { Model } = require('../src/model.js');

let model;
describe('Model', () => {
  before(() => {
    model = new Model();
  });

  describe("#exists()", () => {
    it('should return true if key exists', (done) => {
      // TODO Fix test return check
      model.exists("test_exists").then((value) => {
        expect(value).to.be.true;
        done();
      });
    });
    it('should return false if key does not exist', (done) => {
      // TODO Fix test return check
      model.exists("test_exists_invalid").then((value) => {
        expect(value).to.be.false;
        done();
      });
    });
  });

  describe("#read()", () => {
    it('should return the correct value if the key exists.', (done) => {
      model.read("test_read").then((value) => {
        expect(value).to.equal("Hello world!");
        done();
      });
    });
    it('should return null if the key does not exist.', (done) => {
      model.read("test_read_invalid").then((value) => {
        expect(value).to.be.null;
        done();
      });
    });
  });

  describe("#write()", () => {
    it('should write the correct value if the key exists.', (done) => {
      let date = Date.now().toString();
      model.write("test_write", date).then(() => {
        model.read("test_write").then((value_read) => {
          expect(value_read).to.equal(date);
          done();
        });
      });
    });
  });
});