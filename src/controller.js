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
                let unique = false;
                while(!unique) {
                    roomID = uuidv4();
                    console.log(roomID);
                    unique = await this.model.exists(roomID);
                }
                return this.model.write(roomID, '').then(() => {
                    return roomID, '';
                });
            }
        });
    }
    update(roomID, message) {
        return;
    }
}

module.exports = { Controller };