const { Model } = require('./model');
const { v4: uuidv4 } = require('uuid');


class Controller {
  constructor() {
    this.model = new Model();
  }
  connect(roomID) {
    return this.model.exists(roomID).then(async (exists) => {
      if(exists) {
        let message = await this.model.read(roomID);
        return {roomID: roomID, message: message};
      }
      else {
        /** Generate roomID as a UUID. */
        let not_unique = true;
        while(not_unique) {
          roomID = uuidv4();
          not_unique = await this.model.exists(roomID);
        }
        return this.model.write(roomID, '').then(() => {
          return {roomID: roomID, message: ''};
        });
      }
    });
  }
  update(roomID, message) {
    /* Check if roomID exists. If yes, update message. */
    return this.model.exists(roomID).then((exists) => {
      if(exists) {
        return this.model.write(roomID, message);
      }
      else {
        return Promise.reject(new Error("Invalid Room ID."));
      }
    })
  }
}

module.exports = { Controller };