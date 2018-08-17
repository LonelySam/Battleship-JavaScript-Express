const connectionDB = require('../database/ConnectionDB.js');
const generateShipSchema = require('../models/ShipSchemaDB.js');

class ValidateShip {
  static isInBoard({rows = 10, cols = 10, shipsArray = [], max_ships = 5}) {
    const size = shipsArray.length;
    if(size !== max_ships) {
      return Promise.reject(
        {
          success: false,
          message: `Invalid numbers of ships`
        }
      );
    }

    return generateShipSchema(connectionDB)
      .findAll()
      .then(defaultShips => {
        shipsArray.forEach(ship => {
          let shipType = ship.type;
          let shipRow = defaultShips.find(ship => ship.dataValues.id === shipType);
          if (ship.orientation === 'H') {
            let endPositionShip = ship.x + shipRow.dataValues.size;
            if (endPositionShip > cols) {
              throw {
                success: false,
                message: `Ship: ${ship.type} is out of the board in that position. Setup not saved.`
              };
            }
          }
          if (ship.orientation === 'V') {
            let endPositionShip = ship.y + shipRow.dataValues.size;
            if (endPositionShip > rows) {
              throw {
                success: false,
                message: `Ship: ${ship.type} is out of the board in that position. Setup not saved.`
              };
            }
          }
        })
        return {
          success: true,
          message: `All the ships met the condition`
        };
      })
      .catch(error => {
        console.log(error);
        throw error;
      })
  }
}

module.exports = ValidateShip;
