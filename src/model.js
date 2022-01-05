const admin = require('firebase-admin');
const serviceAccount = require('./auth/key.json');

class Model {
  /**
   * Initializes a Firebase app and a reference to app data.
   * @class
   * @classdesc Manages R/W operations to the Firebase Realtime Database.
   */
  constructor() {
    if(!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://copyist-66925-default-rtdb.firebaseio.com',
      });
    }

    /**
     * A reference to the rooms route.
     * @type {Reference}
    */
    this.ref = admin.database().ref('rooms');
  }

  /**
   * Checks if a given Room ID exists in the database.
   * @param {string} roomID A client's Room ID for a session.
   * @returns {boolean}
   */
  async exists(roomID) {
    if(roomID == '') {
      return false;
    }
    return await this.ref.child(roomID).once('value').then((snapshot) => {
      return snapshot.exists();
    });
  }

  /**
   * Reads the messsage for a given Room ID. 
   * @param {string} roomID A client's Room ID for a session.
   * @returns {string}
   */
  read(roomID) {
    return this.ref.child(roomID).once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  /** Writes a given messsage for a given Room ID.
   * @param {string} roomID A client's Room ID for a session.
   * @param {string} message Modified contents of a session.
   * @returns {Promise} A promise indicating the success or failure of the operation.
   */
  write(roomID, message) {
    return this.ref.child(roomID).set(message);
  }
}

module.exports = { Model };
