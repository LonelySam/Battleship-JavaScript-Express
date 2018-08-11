const connectionDB = require('./ConnectionDB');
const generateGameSchema = require('../models/GameSchemaDB.js');

class Database {
  static init() {
    return connectionDB
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        return generateGameSchema(connectionDB)
          .sync({force: false})
      })
      .then(() => console.log("Creation of table Game succesful"))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}

module.exports = Database;
