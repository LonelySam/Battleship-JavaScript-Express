const connectionDB = require('../database/ConnectionDB.js');
const generateBoardSchema = require('../models/BoardSchemaDB.js');
const generateGameSchema = require('../models/GameSchemaDB.js');
const generatePlayerSchema = require('../models/PlayerSchemaDB.js');
const generateShipSetupSchema = require('../models/ShipSetupSchemaDB.js');
const ShipSetupValidator = require('./ShipSetupValidator.js');

class Board {
  static createShipSetup({gameId = 0, playerId = 0, shipsArray = []} = {}) {
    const boardModel = generateBoardSchema(connectionDB);
    const gameModel = generateGameSchema(connectionDB);
    const playerModel = generatePlayerSchema(connectionDB);
    const shipSetupModel = generateShipSetupSchema(connectionDB);
    
    return gameModel.findOne( { where: {id: gameId} } )
      .then(gameFound => {
        const {rows, cols, max_ships} = gameFound.dataValues;
        return ShipSetupValidator.isInBoard({rows, cols, shipsArray, max_ships});
        
      })
      .then(result => {
        if (result.success)
        {
          return playerModel.findOne({
            where: {
              id: playerId,
            }
          })
        } else {
          throw result;
        }
      })
      .then(playerFound => {
        return boardModel.findOne({ where: { player_id: playerFound.dataValues.id } });
      })
      .then(boardFound => {
        const boardId = boardFound.dataValues.id;
        shipsArray.forEach(ship => ship.board_id = boardId);
        //Maybe here we should register the data with FindOrCreate if the user can somehow change the position of the ships
        return shipSetupModel.bulkCreate(shipsArray);
      })
      .then(() => {
        return "Positions saved successfully";
      })
      .catch(error => {
				console.log(error);
				throw error;
			});
  }
}

module.exports = Board;