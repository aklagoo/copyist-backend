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

  exists(roomID) {
    let exists = this.ref.child(roomID).once('value').then((snapshot) => {
      return snapshot.exists();
    });
    return exists;
  }

  read(roomID) {
    return;
  }

  write(roomID, message) {
    return;
  }
}

module.exports = { Model };