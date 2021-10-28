const { expect } = require('chai');
const { validate } = require('uuid');
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
                done();
            });
        });
        it('should return the same message if the roomID exists.', (done) => {
            controller.connect(connectRoomIDValid).then((data) => {
                expect(data.message).to.equal(connectMessageValid);
                done();
            });
        });
        it('should return a valid UUID if the roomID is invalid.', (done) => {
            controller.connect(connectRoomIDInvalid).then((data) => {
                expect(validate(data.roomID)).to.be.true;
                done();
            });
        });
        it('should return an empty message if the roomID is invalid.', (done) => {
            controller.connect(connectRoomIDInvalid).then((data) => {
                expect(data.message).to.equal('');
                done();
            });
        });
    });
});