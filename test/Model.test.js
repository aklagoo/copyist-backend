const { expect } = require('chai');
const { Model } = require('../src/model.js');
let model;

describe('Model', () => {
    before(() => {
        model = new Model();
    });

    describe("#exists()", () => {
        it('should return true if key exists', () => {
            expect(model.exists()).to.be.true;
        });
    });
});