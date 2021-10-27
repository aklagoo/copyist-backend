const { expect } = require('chai');
const { Model } = require('../src/model.js');

let model;
describe('Model', () => {
    before(() => {
        model = new Model();
    });

    describe("#exists()", () => {
        it('should return true if key exists', (done) => {
            model.exists("test_exists").then((value) => {
                expect(value).to.be.true;
                done();
            });
        });
        it('should return false if key does not exist', (done) => {
            // TODO Fix test return check
            model.exists("test_does_not_exist").then((value) => {
                expect(value).to.be.false;
                done();
            });
        });
    });
});