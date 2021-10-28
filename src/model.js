const admin = require('firebase-admin');
const serviceAccount = require('./auth/key.json');

class Model {
  constructor() {
    if(!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://copyist-66925-default-rtdb.firebaseio.com',
      });
    }

    this.ref = admin.database().ref('rooms');
  }

  async exists(roomID) {
    let exists = await this.ref.child(roomID).once('value').then((snapshot) => {
      return snapshot.exists();
    });
    return exists;
  }

  read(roomID) {
    return this.ref.child(roomID).once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  write(roomID, message) {
    return this.ref.child(roomID).set(message);
  }
}

module.exports = { Model };