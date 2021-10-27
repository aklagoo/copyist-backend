const admin = require('firebase-admin');
const serviceAccount = require('./auth/key.json');

class Model {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://copyist-66925-default-rtdb.firebaseio.com',
    });

    this.ref = admin.database().ref('rooms');
  }

  async exists(roomID) {
    return this.ref.child(roomID).once('value').then((snapshot) => {
      return snapshot.exists();
    });
  }

  read(roomID) {
    return this.ref.child(roomID).once('value').then((snapshot) => {
      return snapshot.val();
    });
  }

  write(roomID, message) {
    return;
  }
}

module.exports = { Model };