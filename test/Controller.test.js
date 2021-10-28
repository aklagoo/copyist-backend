const { expect } = require('chai');
const { validate } = require('uuid');
const { Controller } = require('../src/controller.js');
const { Model } = require('../src/model.js');

/* Test constants */
const connectRoomIDValid = 'test_connectRoomIDValid';
const connectMessageValid = 'test_connectMessage';
const connectRoomIDInvalid = 'test_connectUUIDInvalid';
const updateRoomIDValid = 'test_updateRoomIDValid';
const updateRoomIDInvalid = 'test_updateRoomIDValid';

let controller;
let model;
describe('Controller', () => {
  /* Initialize the controller and the model. */
  before(() => {
    controller = new Controller();
    model = new Model();
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

  describe('#update', () => {
    it('should update the message if the roomID is valid.', (done) => {
      const message = Date.now().toString();
      controller.update(updateRoomIDValid, message).then(async () => {
        const readMessage = await model.read(updateRoomIDValid);
        expect(readMessage).to.equal(message);
        done();
      });
    });
  });
});