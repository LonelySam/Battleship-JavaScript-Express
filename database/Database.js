const connectionDB = require('./ConnectionDB');
const generateBoardSchema = require('../models/BoardSchemaDB.js');
const generateGameSchema = require('../models/GameSchemaDB.js');
const generatePlayerSchema = require('../models/PlayerSchemaDB.js');
const generateShipSetupSchema = require('../models/ShipSetupSchemaDB.js');
const generateShipSchema = require('../models/ShipSchemaDB.js');

class Database {
  static init() {
    return connectionDB
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        return generateGameSchema(connectionDB)
          .sync({force: false});
      })
      .then(() => console.log("Creation of table Game succesful"))
      .then(() => {
        return generatePlayerSchema(connectionDB)
          .sync({force: false});
      })
      .then(() => console.log("Creation of table Player succesful"))
      .then(() => {
        return generateBoardSchema(connectionDB)
          .sync({force: false});
      })
      .then(() => console.log("Creation of table Board succesful"))
      .then(() => {
        return generateShipSchema(connectionDB)
          .sync({force: false});
      })
      .then(() => {
        console.log("Creation of table Ship succesful");
        return generateShipSchema(connectionDB).count();
      })
      .then((quantityDefaultShips) => {
        if (quantityDefaultShips === 0) {
          return generateShipSchema(connectionDB).bulkCreate([
            { id: 1, name: 'Carrier', size: 5},
            { id: 2, name: 'Battleship', size: 4},
            { id: 3, name: 'Crusier', size: 3},
            { id: 4, name: 'Submarine', size: 3},
            { id: 5, name: 'Destroyer', size: 2}
          ]);
        }
        return true;
      })
      .then(() => console.log("Ship table filled successfully"))
      .then(() => {
        return generateShipSetupSchema(connectionDB)
          .sync({force: false});
      })
      .then(() => console.log("Creation of table ShipSetup succesful"))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}

module.exports = Database;
