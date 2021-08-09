const admin = require('firebase-admin');
const serviceAccount = require('./src/auth/key.json');

class Model {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://copyist-66925-default-rtdb.firebaseio.com',
    });

    this.ref = admin.database().ref('rooms');
  }
}

module.exports = { Model };