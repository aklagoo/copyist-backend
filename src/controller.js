const { Model } = require('./model');
const { v4: uuidv4 } = require('uuid');

class Controller {
  /**
   * Initializes a {@link Model model} for database operations.
   * @class
   * @classdesc Handles connections and message updates.
   */
  constructor() {
    /**
     * A {@link Model model} instance for database operations
     * @type {Model}
    */
    this.model = new Model();
  }

  /**
   * Checks if a room ID exists or creates a valid UUID.
   * 
   * This method reads a message if the provided roomID exists. Otherwise, it generates a unique roomID and an empty message.
   * @param {string} roomID A client's Room ID for a session.
   * @returns {Object} A valid Room ID and a message. Format: { roomID, message }
   */
  connect(roomID) {
    // Check if roomID already exists.
    return this.model.exists(roomID).then(async (exists) => {
      if(exists) {
        // If roomID exists, read message and return.
        const message = await this.model.read(roomID);
        return { roomID, message, };
      } else {
        const message = '';
        let roomID_;

        // Generate a new roomID until a unique roomID is found.
        let not_unique = true;
        while(not_unique) {
          roomID_ = uuidv4();
          not_unique = await this.model.exists(roomID);
        }

        // Write an empty message to the new roomID.
        return this.model.write(roomID_, '').then(() => {
          return { roomID: roomID_, message, };
        });
      }
    });
  }

  /**
   * Updates the corresponding value if a room ID exists.
   * @param {string} roomID A client's Room ID for a session.
   * @param {string} message Modified contents of a session.
   * @returns {Promise} A promise indicating the success or failure of the operation.
   */
  update(roomID, message) {
    return this.model.exists(roomID).then((exists) => {
      // If roomID exists, write the message.
      if(exists) {
        return this.model.write(roomID, message);
      }
      
      // Otherwise, reject the promise.
      return Promise.reject(new Error("Invalid Room ID."));
    });
  }
}

module.exports = { Controller };
