const { expect } = require('chai');
const { Controller } = require('../src/controller.js');

/* Test constants */
const connectRoomIDValid = 'test_roomIDValid';
const connectMessageValid = 'test_message';
const connectRoomIDInvalid = 'test_UUIDInvalid';

let controller;
describe('Controller', () => {
    /* Initialize the controller. */
    before(() => {
        controller = new Controller();
    });

    /* All tests */
    describe('#connect', () => {
        it('should return the same roomID if it exists.', (done) => {
            controller.connect(connectRoomIDValid).then((data) => {
                expect(data.roomID).to.equal(connectRoomIDValid);
                console.log("Hello");
                done();
            });
        });
    });
});