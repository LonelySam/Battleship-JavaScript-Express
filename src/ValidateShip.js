const connectionDB = require('../database/ConnectionDB.js');
const generateShipSchema = require('../models/ShipSchemaDB.js');

class ValidateShip {
  static isInBoard({rows = 10, cols = 10, shipsArray = []}) {
    return generateShipSchema(connectionDB)
      .findAll()
      .then(shipsRecords => {
        let result = {
          success: true,
          message: 'All the ships met the condition'
        };

        shipsArray.forEach(ship => {
          let shipType = ship.type;
          let shipRow = shipsRecords.find(ship => ship.dataValues.id === shipType);
          if (ship.orientation === 'H') {
            let endPositionShip = ship.x + shipRow.dataValues.size;
            if (endPositionShip > cols) {
              result.success = false;
              result.message = `Ship: ${ship.type} is out of the board in that position. Positioning not saved.`;
              throw result;
            }
          }
          if (ship.orientation === 'V') {
            let endPositionShip = ship.y + shipRow.dataValues.size;
            if (endPositionShip > rows) {
              result.success = false;
              result.message = `Ship type: ${ship.type} is out of the board in that position. Positioning not saved.`;
              throw result;
            }
          }
        })
        return result;
      })
      .catch(error => {
        console.log(error);
        throw error;
      })
  }

  static numberOfShips(shipsArray) {
    return new Promise((resolve, reject) => {
      const size = shipsArray.length;
      if(size === 5) {
        resolve(true)
      }
      reject("Incorrect number of ships")
    });
  }
}

module.exports = ValidateShip;
